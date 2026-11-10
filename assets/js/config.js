/* GAMBIT public website settings. Never put passwords, seed phrases or private keys here. */
window.GAMBIT = Object.freeze({
  version: '2.2.0',
  launchAt: null, // Optional official UTC timestamp; countdown appears automatically when supplied
  presaleUsdPrice: 0.0001,
  walletCapUsd: 1000,
  totalSupply: '100000000000000',
  saleSupply: '10000000000000',
  telegramUrl: '', // Only set when you have an official channel
  xUrl: '',
  // On-chain launch settings: leave blank/disabled until a verified address is provided
  chainId: 56, // Public-facing BNB Smart Chain; switch to 97 for testnet verification
  contractAddress: '', // The GAM token address will be cross-checked against the presale contract
  presaleAddress: '',
  previewOnly: true,
  liveTransactionsEnabled: false,
  maxQuoteMovementBps: 100
});
