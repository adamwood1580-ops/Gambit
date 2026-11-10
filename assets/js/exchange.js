/* Gambit Wallet Desk v2.1. Uses EIP-1193 (no custodial backend or dependency).
 * IMPORTANT: previewOnly=true and liveTransactionsEnabled=false by default.
 * No value-moving request is ever made unless both flags have been deliberately set,
 * correct chain + verified deployed contract bytecode/identities are confirmed,
 * and the user clicks the relevant transaction button.
 */
(function () {
  'use strict';
  const cfg = window.GAMBIT || {};
  const $ = id => document.getElementById(id);
  const selectors = Object.freeze({
    transfer: 'a9059cbb', balanceOf: '70a08231', decimals: '313ce567', symbol: '95d89b41',
    gam: 'a0fc44f5', isSaleOpen: '1a081330', finalized: 'b3f05b97', cancelled: '9a82a09a',
    quoteUsd18: 'de54c59c', quoteTokens: '2c9115c7', remainingWalletUsd18: 'dcbeaf8c',
    usdContributed: '60e5f65b', gamOwed: 'a453d494', buyTokens: '3610724e',
    claim: '4e71d92d', TOKEN_PRICE_USD18: '8471d8ce', MAX_WALLET_USD18: 'cc37c3d1'
  });
  const validAddress = s => typeof s === 'string' && /^0x[0-9a-fA-F]{40}$/.test(s);
  const ZERO = '0x0000000000000000000000000000000000000000';
  const encodeUint = n => BigInt(n).toString(16).padStart(64, '0');
  const encodeAddr = a => a.slice(2).toLowerCase().padStart(64, '0');
  const callData = (selector, ...args) => '0x' + selector + args.join('');
  const fromHex = v => {
    if (typeof v !== 'string' || !/^0x[0-9a-f]*$/i.test(v) || v === '0x') throw new Error('Contract returned invalid data.');
    return BigInt(v);
  };
  const unpackAddress = hex => '0x' + hex.slice(-40);
  function unpackString(hex) {
    if (typeof hex !== 'string' || !/^0x[0-9a-f]+$/i.test(hex) || hex.length < 130) throw new Error('Invalid token metadata.');
    const offset = Number(BigInt('0x' + hex.slice(2, 66)));
    const lengthPosition = 2 + offset * 2;
    const n = Number(BigInt('0x' + hex.slice(lengthPosition, lengthPosition + 64)));
    if (!Number.isSafeInteger(n) || n < 1 || n > 64) throw new Error('Invalid token metadata.');
    const payload = hex.slice(lengthPosition + 64, lengthPosition + 64 + n * 2);
    if (payload.length !== n * 2) throw new Error('Truncated token metadata.');
    const bytes = payload.match(/.{2}/g).map(s => Number.parseInt(s, 16));
    return String.fromCharCode(...bytes);
  }
  function parseUnits(value, decimals = 18) {
    const str = String(value).trim();
    if (!/^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(str)) throw new Error('Enter a positive number without commas or symbols.');
    const [whole, fraction = ''] = str.split('.');
    if (fraction.length > decimals) throw new Error('Too many decimal places.');
    return BigInt(whole) * (10n ** BigInt(decimals)) + BigInt((fraction.padEnd(decimals, '0') || '0'));
  }
  function formatUnits(raw, decimals = 18, precision = 5) {
    const neg = BigInt(raw) < 0n;
    const n = neg ? -BigInt(raw) : BigInt(raw);
    const div = 10n ** BigInt(decimals);
    const whole = (n / div).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const fractions = (n % div).toString().padStart(decimals, '0').slice(0, precision).replace(/0+$/, '');
    return (neg ? '-' : '') + whole + (fractions ? '.' + fractions : '');
  }
  function formatUsd(raw) { return '$' + formatUnits(raw, 18, 2); }
  function addressShort(a) { return a ? a.slice(0, 6) + '…' + a.slice(-4) : 'NOT CONNECTED'; }
  function chainLabel(chainId) { return Number(chainId) === 97 ? 'BSC TESTNET · 97' : Number(chainId) === 56 ? 'BNB CHAIN · 56' : 'UNKNOWN NETWORK'; }
  function explorerBase() { return Number(cfg.chainId) === 56 ? 'https://bscscan.com' : 'https://testnet.bscscan.com'; }
  const desiredChain = Number(cfg.chainId) === 56 ? 56 : 97;
  const liveEnabled = () => cfg.previewOnly === false && cfg.liveTransactionsEnabled === true;
  const state = {
    provider: null, wallet: '', correctChain: false, tokenAddress: '', tokenValid: false, presaleValid: false,
    saleOpen: false, finalized: false, cancelled: false, walletRemaining: null,
    gamBalance: 0n, bnbBalance: 0n, gamOwed: 0n, quoteBnb: 0n,
    quoteGam: 0n, quoteUsd: 0n, quoteOk: false, quoteSequence: 0, listeners: false
  };
  function status(message, type = 'neutral') { const el = $('desk-status'); el.textContent = message; el.dataset.type = type; }
  function txLink(hash) {
    const el = $('desk-tx-link');
    if (typeof hash === 'string' && /^0x[0-9a-fA-F]{64}$/.test(hash)) {
      el.href = explorerBase() + '/tx/' + hash;
      el.hidden = false;
    } else { el.hidden = true; el.removeAttribute('href'); }
  }
  function humanError(err) {
    if (err && (err.code === 4001 || err.code === 'ACTION_REJECTED')) return 'Wallet request was rejected.';
    if (err && err.code === -32002) return 'A wallet request is already pending. Open your wallet to complete it.';
    const raw = String(err?.shortMessage || err?.message || 'Unknown wallet error');
    return raw.length > 230 ? raw.slice(0, 230) + '…' : raw;
  }
  function discoverProvider() {
    if (state.provider) return state.provider;
    // EIP-6963 injected wallets; favour MetaMask if multiple providers are present.
    const discovered = window.__gambitWallets || [];
    const found = discovered.find(x => x.info?.rdns === 'io.metamask' || x.provider?.isMetaMask) || discovered[0];
    const injected = found?.provider || (Array.isArray(window.ethereum?.providers)
      ? window.ethereum.providers.find(p => p.isMetaMask) || window.ethereum.providers[0]
      : window.ethereum);
    if (injected && typeof injected.request === 'function') state.provider = injected;
    return state.provider;
  }
  window.__gambitWallets = [];
  window.addEventListener('eip6963:announceProvider', e => {
    if (e.detail?.provider?.request && !window.__gambitWallets.some(x => x.provider === e.detail.provider)) window.__gambitWallets.push(e.detail);
  });
  window.dispatchEvent(new Event('eip6963:requestProvider'));
  async function request(method, params = []) {
    if (!state.provider) throw new Error('Connect a supported BSC browser wallet first.');
    return state.provider.request({ method, params });
  }
  async function read(to, selector, ...argumentsEncoded) {
    return request('eth_call', [{ to, data: callData(selector, ...argumentsEncoded) }, 'latest']);
  }
  async function numberRead(to, selector, ...args) { return fromHex(await read(to, selector, ...args)); }
  function updateButtons() {
    const ready = state.wallet && state.correctChain && state.tokenValid;
    $('desk-connect').textContent = state.wallet ? 'CONNECTED' : 'CONNECT WALLET';
    $('desk-mode').textContent = liveEnabled() ? 'TX MODE / CONTRACT CHECKS ON' : 'WALLET CONNECT / PURCHASES NOT OPEN';
    $('desk-refresh').disabled = !state.wallet;
    const enoughCap = state.walletRemaining != null && state.quoteUsd > 0n && state.quoteUsd <= state.walletRemaining;
    $('desk-buy').disabled = !(liveEnabled() && ready && state.presaleValid && state.saleOpen && state.quoteOk && enoughCap && state.quoteBnb <= state.bnbBalance);
    $('desk-buy').textContent = liveEnabled() ? 'BUY GAM WITH BNB' : 'PRESALE NOT OPEN';
    $('desk-claim').disabled = !(liveEnabled() && ready && state.presaleValid && state.finalized && state.gamOwed > 0n);
    let validRecipient = validAddress($('desk-recipient').value.trim());
    const amount = $('desk-send-amount').value.trim();
    let amountRaw = 0n;
    try { if (amount) amountRaw = parseUnits(amount); } catch (_) { validRecipient = false; }
    $('desk-send').disabled = !(liveEnabled() && ready && validRecipient && amountRaw > 0n && amountRaw <= state.gamBalance && $('desk-recipient').value.toLowerCase() !== state.wallet.toLowerCase());
    $('desk-send').textContent = liveEnabled() ? 'REVIEW GAM TRANSFER' : 'GAM TRANSFERS NOT OPEN';
  }
  async function switchChain() {
    const chain = await request('eth_chainId');
    if (Number.parseInt(chain, 16) === desiredChain) return;
    const hex = '0x' + desiredChain.toString(16);
    try { await request('wallet_switchEthereumChain', [{ chainId: hex }]); }
    catch (err) {
      if (err.code !== 4902) throw err;
      const networks = desiredChain === 97
        ? { chainId: hex, chainName: 'BNB Smart Chain Testnet', nativeCurrency: {name: 'Test BNB', symbol: 'tBNB', decimals: 18}, rpcUrls: ['https://data-seed-prebsc-1-s1.bnbchain.org:8545/'], blockExplorerUrls: ['https://testnet.bscscan.com'] }
        : { chainId: hex, chainName: 'BNB Smart Chain', nativeCurrency: {name: 'BNB', symbol: 'BNB', decimals: 18}, rpcUrls: ['https://bsc-dataseed.bnbchain.org/'], blockExplorerUrls: ['https://bscscan.com'] };
      await request('wallet_addEthereumChain', [networks]);
      await request('wallet_switchEthereumChain', [{ chainId: hex }]);
    }
  }
  function resetContractState() {
    state.tokenAddress = ''; state.tokenValid = false; state.presaleValid = false; state.saleOpen = false;
    state.finalized = false; state.cancelled = false; state.walletRemaining = null;
    state.gamBalance = 0n; state.gamOwed = 0n; state.quoteOk = false;
    state.quoteUsd = 0n; state.quoteGam = 0n; state.quoteBnb = 0n;
    $('desk-gam-balance').textContent = '—'; $('desk-usd-quote').textContent = '—';
    $('desk-gam-quote').textContent = '—'; $('desk-wallet-remaining').textContent = '—';
    $('desk-claim-amount').textContent = '—'; $('desk-sale-state').textContent = 'PRESALE NOT OPEN';
  }
  async function verifyToken() {
    // When only the GambitPresale address is provided, derive GAM from gam() on-chain.
    // This avoids needing the site owner to enter a second token address.
    let token = cfg.contractAddress;
    if (!validAddress(token) && validAddress(cfg.presaleAddress)) {
      const code = await request('eth_getCode', [cfg.presaleAddress, 'latest']);
      if (!code || code === '0x') throw new Error('Presale address has no contract code on this chain.');
      const value = await read(cfg.presaleAddress, selectors.gam);
      token = unpackAddress(value);
    }
    if (!validAddress(token) || token.toLowerCase() === ZERO) return false;
    const code = await request('eth_getCode', [token, 'latest']);
    if (!code || code === '0x') throw new Error('GAM address has no contract code on this network.');
    const [symbol, decimals] = await Promise.all([read(token, selectors.symbol), numberRead(token, selectors.decimals)]);
    if (unpackString(symbol) !== 'GAM' || decimals !== 18n) throw new Error('Resolved GAM contract has unexpected token metadata.');
    state.tokenAddress = token;
    return true;
  }
  async function verifyPresale() {
    const addr = cfg.presaleAddress;
    if (!validAddress(addr) || !state.tokenValid) return false;
    if (await request('eth_getCode', [addr, 'latest']) === '0x') throw new Error('Presale contract not deployed on this network.');
    const [onChainToken, onChainPrice, onChainCap] = await Promise.all([
      read(addr, selectors.gam), numberRead(addr, selectors.TOKEN_PRICE_USD18), numberRead(addr, selectors.MAX_WALLET_USD18)
    ]);
    if (unpackAddress(onChainToken).toLowerCase() !== state.tokenAddress.toLowerCase()) throw new Error('Presale is linked to a different GAM token.');
    if (onChainPrice !== 100_000_000_000_000n || onChainCap !== 1000n * 10n ** 18n) throw new Error('On-chain presale terms differ from the announced $0.0001 / $1,000 cap.');
    return true;
  }
  async function refreshAll() {
    if (!state.provider || !state.wallet) return;
    resetContractState();
    try {
      const current = Number.parseInt(await request('eth_chainId'), 16);
      state.correctChain = current === desiredChain;
      $('desk-chain').textContent = state.correctChain ? chainLabel(current) : `WRONG NETWORK · ${current}`;
      $('desk-account').textContent = addressShort(state.wallet);
      if (!state.correctChain) { status(`Switch your wallet to ${chainLabel(desiredChain)} to read Gambit data.`, 'error'); return; }
      state.bnbBalance = fromHex(await request('eth_getBalance', [state.wallet, 'latest']));
      $('desk-bnb-balance').textContent = formatUnits(state.bnbBalance, 18, 5) + ' BNB';
      state.tokenValid = await verifyToken();
      if (state.tokenValid) {
        state.gamBalance = await numberRead(state.tokenAddress, selectors.balanceOf, encodeAddr(state.wallet));
        $('desk-gam-balance').textContent = formatUnits(state.gamBalance, 18, 3) + ' GAM';
      }
      state.presaleValid = await verifyPresale();
      if (state.presaleValid) {
        const [saleOpen, finalized, cancelled, walletRemaining, claim] = await Promise.all([
          numberRead(cfg.presaleAddress, selectors.isSaleOpen), numberRead(cfg.presaleAddress, selectors.finalized),
          numberRead(cfg.presaleAddress, selectors.cancelled), numberRead(cfg.presaleAddress, selectors.remainingWalletUsd18, encodeAddr(state.wallet)),
          numberRead(cfg.presaleAddress, selectors.gamOwed, encodeAddr(state.wallet))
        ]);
        state.saleOpen = saleOpen !== 0n; state.finalized = finalized !== 0n; state.cancelled = cancelled !== 0n;
        state.walletRemaining = walletRemaining; state.gamOwed = claim;
        $('desk-wallet-remaining').textContent = formatUsd(walletRemaining);
        $('desk-claim-amount').textContent = formatUnits(claim, 18, 4) + ' GAM';
        $('desk-sale-state').textContent = state.cancelled ? 'CANCELLED' : state.finalized ? 'FINALIZED' : state.saleOpen ? 'ON-CHAIN OPEN' : 'NOT OPEN';
        await updateQuote();
      } else {
        $('desk-sale-state').textContent = 'PRESALE NOT OPEN';
      }
      if (!state.tokenValid) status('Wallet connected. GAM token balances become available after on-chain activation; purchases remain closed.', 'neutral');
      else if (!state.presaleValid) status('Wallet connected. The Gambit presale is not currently open.', 'neutral');
      else status(state.saleOpen ? 'Presale contract is connected. Transactions remain unavailable until authorised launch.' : 'Presale is not currently accepting purchases.', 'neutral');
    } catch (e) { status('On-chain verification failed: ' + humanError(e), 'error'); resetContractState(); }
    finally { updateDexLink(); updateButtons(); }
  }
  function updateDexLink() {
    const link = $('desk-dex-link');
    // PancakeSwap BNB Chain mainnet only; no unsupported testnet swap links.
    const available = desiredChain === 56 && state.correctChain && state.tokenValid && validAddress(state.tokenAddress);
    if (available) {
      const url = new URL('https://pancakeswap.finance/swap');
      url.searchParams.set('chain', 'bsc'); url.searchParams.set('inputCurrency', 'BNB');
      url.searchParams.set('outputCurrency', state.tokenAddress);
      link.href = url.toString(); link.removeAttribute('aria-disabled'); link.removeAttribute('tabindex');
      link.classList.remove('desk-disabled-link'); link.textContent = 'OPEN OFFICIAL PANCAKESWAP ↗';
    } else {
      link.href = '#exchange'; link.setAttribute('aria-disabled', 'true'); link.tabIndex = -1;
      link.classList.add('desk-disabled-link'); link.textContent = 'TRADING NOT OPEN';
    }
  }
  async function updateQuote() {
    const seq = ++state.quoteSequence;
    state.quoteOk = false; state.quoteBnb = 0n; state.quoteUsd = 0n; state.quoteGam = 0n;
    $('desk-usd-quote').textContent = '—'; $('desk-gam-quote').textContent = '—';
    const value = $('desk-buy-amount').value.trim();
    if (!value || !state.presaleValid || !state.correctChain) { updateButtons(); return; }
    try {
      const amount = parseUnits(value);
      if (amount <= 0n) throw new Error('Enter a BNB amount above zero.');
      const [usd, gam] = await Promise.all([
        numberRead(cfg.presaleAddress, selectors.quoteUsd18, encodeUint(amount)),
        numberRead(cfg.presaleAddress, selectors.quoteTokens, encodeUint(amount))
      ]);
      if (seq !== state.quoteSequence) return;
      state.quoteBnb = amount; state.quoteUsd = usd; state.quoteGam = gam;
      state.quoteOk = usd > 0n && gam > 0n;
      $('desk-usd-quote').textContent = formatUsd(usd);
      $('desk-gam-quote').textContent = formatUnits(gam, 18, 3) + ' GAM';
      if (state.walletRemaining !== null && usd > state.walletRemaining) status('Quote exceeds your remaining $1,000 cumulative wallet limit. Enter less BNB.', 'error');
      else if (amount > state.bnbBalance) status('Your wallet has insufficient BNB; gas fees also require a BNB balance.', 'error');
    } catch (e) {
      if (seq !== state.quoteSequence) return;
      status('Quote unavailable: ' + humanError(e), 'error');
    } finally { if (seq === state.quoteSequence) updateButtons(); }
  }
  async function connect() {
    txLink();
    try {
      if (!discoverProvider()) throw new Error('No injected EVM wallet detected. Install MetaMask or open this HTTPS site in MetaMask’s mobile in-app browser.');
      // Access is requested only as a direct result of clicking Connect.
      const accounts = await request('eth_requestAccounts');
      if (!accounts || !validAddress(accounts[0])) throw new Error('Wallet returned no usable account.');
      state.wallet = accounts[0];
      if (!state.listeners && typeof state.provider.on === 'function') {
        state.provider.on('accountsChanged', accounts => {
          state.wallet = validAddress(accounts?.[0]) ? accounts[0] : '';
          if (!state.wallet) { resetContractState(); $('desk-account').textContent = 'NOT CONNECTED'; $('desk-bnb-balance').textContent = '—'; updateButtons(); status('Wallet disconnected.'); }
          else refreshAll();
        });
        state.provider.on('chainChanged', () => refreshAll());
        state.listeners = true;
      }
      try { await switchChain(); }
      catch (e) { status('Wallet connected but the network switch failed: ' + humanError(e), 'error'); }
      await refreshAll();
    } catch (e) { status(humanError(e), 'error'); }
  }
  async function ensureReady(kind) {
    if (!liveEnabled()) throw new Error('Presale transactions are not currently enabled.');
    if (!state.wallet || !state.correctChain || !state.tokenValid) throw new Error('Connect your BSC wallet and verify the deployed GAM contract.');
    if (Number.parseInt(await request('eth_chainId'), 16) !== desiredChain) throw new Error('Wallet network changed.');
    // Re-verify bytecode + identities immediately before wallet request.
    if (!await verifyToken()) throw new Error('GAM contract verification failed.');
    if (kind === 'presale' && !await verifyPresale()) throw new Error('Presale contract verification failed.');
  }
  async function sendTransaction({to, data, value = '0x0'}) {
    txLink();
    const result = await request('eth_sendTransaction', [{ from: state.wallet, to, data, value }]);
    if (typeof result !== 'string' || !/^0x[\da-f]{64}$/i.test(result)) throw new Error('Wallet did not return a transaction hash.');
    txLink(result);
    status('Transaction submitted to the network. Check the explorer for confirmation before relying on its result.', 'success');
    return result;
  }
  async function buy() {
    try {
      await ensureReady('presale');
      if (await numberRead(cfg.presaleAddress, selectors.isSaleOpen) !== 1n) throw new Error('Presale is closed.');
      const value = parseUnits($('desk-buy-amount').value);
      if (value <= 0n) throw new Error('Enter a positive BNB amount.');
      const [usd, gam, remaining, balance] = await Promise.all([
        numberRead(cfg.presaleAddress, selectors.quoteUsd18, encodeUint(value)),
        numberRead(cfg.presaleAddress, selectors.quoteTokens, encodeUint(value)),
        numberRead(cfg.presaleAddress, selectors.remainingWalletUsd18, encodeAddr(state.wallet)),
        request('eth_getBalance', [state.wallet, 'latest'])
      ]);
      if (usd === 0n || gam === 0n) throw new Error('Quote unavailable.');
      if (usd > remaining) throw new Error('Amount exceeds remaining wallet cap.');
      if (value >= fromHex(balance)) throw new Error('Insufficient BNB including a gas reserve.');
      const slippage = Number(cfg.maxQuoteMovementBps);
      if (!Number.isInteger(slippage) || slippage < 0 || slippage > 500) throw new Error('Invalid quote-movement setting.');
      const minGam = gam * (10000n - BigInt(slippage)) / 10000n;
      // Note: this presale contract rounds on-chain; no ordinary ERC20 approval is necessary.
      await sendTransaction({ to: cfg.presaleAddress, data: callData(selectors.buyTokens, encodeUint(minGam)), value: '0x' + value.toString(16) });
    } catch (e) { status('Purchase not submitted: ' + humanError(e), 'error'); }
  }
  async function claim() {
    try {
      await ensureReady('presale');
      if (await numberRead(cfg.presaleAddress, selectors.finalized) !== 1n) throw new Error('Sale not finalised.');
      if (await numberRead(cfg.presaleAddress, selectors.gamOwed, encodeAddr(state.wallet)) === 0n) throw new Error('No GAM available to claim.');
      await sendTransaction({to: cfg.presaleAddress, data: callData(selectors.claim)});
    } catch (e) { status('Claim not submitted: ' + humanError(e), 'error'); }
  }
  async function transfer() {
    try {
      await ensureReady('transfer');
      const to = $('desk-recipient').value.trim();
      if (!validAddress(to) || to.toLowerCase() === ZERO || to.toLowerCase() === state.wallet.toLowerCase()) throw new Error('Enter a different, non-zero BSC recipient address.');
      const amount = parseUnits($('desk-send-amount').value);
      if (amount <= 0n) throw new Error('Enter a positive GAM amount.');
      const balance = await numberRead(state.tokenAddress, selectors.balanceOf, encodeAddr(state.wallet));
      if (amount > balance) throw new Error('Insufficient GAM balance.');
      await sendTransaction({to: state.tokenAddress, data: callData(selectors.transfer, encodeAddr(to), encodeUint(amount))});
    } catch (e) { status('Transfer not submitted: ' + humanError(e), 'error'); }
  }
  $('desk-connect')?.addEventListener('click', connect);
  $('desk-refresh')?.addEventListener('click', refreshAll);
  $('desk-buy')?.addEventListener('click', buy);
  $('desk-claim')?.addEventListener('click', claim);
  $('desk-send')?.addEventListener('click', transfer);
  let inputDebounce;
  $('desk-buy-amount')?.addEventListener('input', () => { clearTimeout(inputDebounce); state.quoteOk = false; updateButtons(); inputDebounce = setTimeout(updateQuote, 250); });
  $('desk-send-amount')?.addEventListener('input', updateButtons);
  $('desk-recipient')?.addEventListener('input', updateButtons);
  document.querySelectorAll('.desk-tab').forEach(tab => tab.addEventListener('click', () => {
    const selected = tab.dataset.tab;
    document.querySelectorAll('.desk-tab').forEach(t => { const active = t.dataset.tab === selected; t.classList.toggle('active', active); t.setAttribute('aria-selected', String(active)); });
    ['presale', 'swap', 'transfer'].forEach(name => { $('desk-' + name).hidden = name !== selected; });
  }));
  $('desk-chain').textContent = chainLabel(desiredChain);
  updateDexLink(); updateButtons();
  // Expose only deterministic helpers for unit testing, never wallet or signer objects.
  window.GambitWalletMath = Object.freeze({parseUnits, formatUnits, formatUsd, encodeUint, encodeAddr});
})();
