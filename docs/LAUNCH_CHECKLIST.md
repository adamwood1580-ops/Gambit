# Final publishing checklist — Gambit website v2.2

## Static website quality
- [x] All five founding percentages and USD ranges are consistent.
- [x] Website tokenomics matches the whitepaper: 100T GAM, 10T presale, and six fixed allocations.
- [x] Informational casino and event-market descriptions, Angel Vault, AI and FAQs are present.
- [x] Desktop/mobile layout and reward calculations tested.
- [x] Countdown hides itself when there is no scheduled date; social channel links hide until provided.
- [x] Wallet actions blocked until verified contract activation.

## On-chain and legal release controls
- [ ] Provide and validate the GambitPresale contract address (token address derives from it).
- [ ] Validate token and presale deployed-bytecode identities, cap/price, full fund backing and oracle behaviour.
- [ ] Execute testnet end-to-end buy, claim, cap and transfer scenarios with genuine wallets.
- [ ] Security audit and regulatory/commercial approval of the presale and reward marketing.
- [ ] Only then activate transaction flags and expose sale functionality.

## GitHub Pages
Upload extracted ZIP contents to repository root, with `index.html` in the top-level. Select Settings → Pages → Deploy from a branch → main / root. For social previews on Telegram, set a real absolute `og:image` URL after the final domain is known.
