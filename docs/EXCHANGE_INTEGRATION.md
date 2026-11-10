# Gambit on-chain wallet — activation reference

All value-moving actions ship disabled. Wallet connection and local information sections may be used without placing a transaction. Never turn on the transaction flags merely to make the webpage appear active.

## Single-contract integration

For the GambitPresale v1.4 interface the wallet script can resolve the GAM token address via the sale contract's `gam()` getter, then confirm the on-chain symbol is `GAM` and the token has 18 decimals. It also confirms the presale's on-chain `TOKEN_PRICE_USD18` is $0.0001 (1e14 in 18-decimal fixed units), and `MAX_WALLET_USD18` is $1,000 (1000e18).

The on-chain `quoteUsd18(weiAmount)` and `quoteTokens(weiAmount)` determine purchase quotations; wallet remaining allocations use `remainingWalletUsd18(address)`. The wallet signs `buyTokens(minGamOut)` with BNB as the transaction value. Tokens are claimed through `claim()` after finalisation. A separate ERC-20 `transfer(address,uint256)` supports GAM wallet transfers.

## Verification required for activation

- Token and sale contracts deployed to the intended chain and independently verified against source.
- Presale contract funded with the sold token allotment and operational oracle availability established.
- Sale cap, timing, cancellation/refund and claiming behaviours reviewed on testnet.
- Supported wallets and BSC chain switching verified in actual browser extensions and mobile wallet apps.
- Access and promotional communications cleared for intended territories.
- Set `presaleAddress`, `chainId`, then deliberately remove both transaction locks in `assets/js/config.js` only when ready.

The `previewOnly` and `liveTransactionsEnabled` gates must both be changed to allow any `eth_sendTransaction`. The code uses WalletConnect-style browser provider compatibility (EIP-1193/EIP-6963), but it does not implement a separate mobile wallet-connect relay; mobile wallet users may need their wallet's internal browser.

No wallet keys or customer funds are stored in GitHub Pages. All blockchain transactions are submitted by the user's wallet.
