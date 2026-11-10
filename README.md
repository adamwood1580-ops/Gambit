# GAMBIT — Official website source v2.2

**The Token. The Game. The Edge.** A polished, static GitHub Pages site for the Gambit (GAM) token and gaming ecosystem.

## Publish on GitHub Pages

1. Extract this ZIP. Upload the **contents** (not an enclosing folder) to your GitHub repository root. `index.html`, `assets/`, and `whitepaper/` must all be at the repository root.
2. In GitHub, open **Settings → Pages**. Select **Deploy from a branch** → `main` → `/(root)`, then save.
3. The site works on your repository's `github.io` URL. A custom domain can be added later in GitHub Pages settings. If setting a custom domain, also create the DNS records recommended by GitHub.
4. Share the *published* URL only after checking it for your intended jurisdiction's crypto promotions, gambling marketing and age-access requirements.

## Confirmed product and numeric specification

- Gambit (GAM), BNB Smart Chain, 18 decimals, 100 trillion GAM initial supply and no additional minting.
- 35% community (10T presale, 25T rewards), 25% liquidity, 15% development, 10% team, 10% marketing, 5% treasury.
- Fixed 2% recognised-V2-pool buy tax paid in GAM to the community reward wallet; 2% recognised-V2-pool sell tax permanently burned from total supply. Ordinary wallet-to-wallet GAM transfers: no trading tax.
- Presale: 10 trillion GAM at **$0.0001 per GAM**, with a **cumulative $1,000 per-wallet cap**. At the maximum contribution, the wallet is entitled to 10 million GAM. This is a wallet, not person-level, limit.
- Founding casino reward tiers: Starter < $50 = 5% (positive contributions only); Bronze $50–<$100 = 7%; Silver $100–<$500 = 20%; Gold $500–<$1,000 = 50%; Angel $1,000 = 70%.
- Rewards: tier rate × positive daily GAM **net casino profit**, once per UTC day. Zero or negative net results produce no bonus. Player can close their reward day once; subsequent play that UTC day earns no additional bonus. Regular winnings are already in the gaming balance; the tier bonus is an *additional* credit. Sportsbook and event market rewards are not combined with casino bonuses.
- Angel Vault: a distinct exclusive bonus-game concept with separately published rules, independent randomness and a funded prize pot. 98% RTP is **not** part of the tier formula.

## Wallet integration: only the presale contract address needs supplying

The wallet desk is already included. It's intentionally transaction-locked in the provided package; the rest of the website is complete as static content.

In `assets/js/config.js`, once the presale is correctly deployed and the contract has been audited/verified for your intended chain:

1. Set `chainId` to the correct network (`56` for production BSC (the site default), or `97` for testnet verification).
2. Set `presaleAddress` to the verified GambitPresale contract address supplied by you.
3. `contractAddress` can stay blank. The website reads the GAM token address from the presale contract's on-chain `gam()` getter and validates the token symbol and decimal count. If you prefer, also explicitly supply `contractAddress`; it is then checked against the presale token.
4. Only **after** testing, funding, on-chain verification and relevant approvals, set both `previewOnly: false` and `liveTransactionsEnabled: true`. The two separate switches guard against accidental transaction activation.
5. The code also compares the actual presale contract's dollar price (`$0.0001`), wallet cap (`$1,000`), BNB/USD oracle quotes, on-chain sale status and purchase amounts; it doesn't trust browser-only calculations for wallet payments.
6. BNB purchases and GAM claims run against the presale contract. GAM transfers use ERC-20 `transfer`. PancakeSwap links are available only once a mainnet GAM token is verified. Real on-chain transactions require explicit confirmation in the connected wallet.

**Do not insert secret keys, private keys, wallet seeds, RPC API secrets or recovery phrases into GitHub Pages files.**

The presale sale price displayed on the brochure is an approved *product-design number*, not a live market price or confirmed investment valuation. The $10 billion implied valuation and $1 billion maximum sale capacity are mathematical quantities, not funding forecasts. Wallet connection alone does not move funds.

## Optional additions (not required to publish)

- `launchAt`: set a UTC ISO timestamp (for example `2027-03-01T18:00:00Z`) to automatically show the launch countdown. If unset, the countdown stays hidden so no fabricated launch date is displayed.
- `telegramUrl`: put your official `https://t.me/...` URL here. If unset, no empty or broken community link is shown.
- `xUrl`: reserved for your X account.
- For Telegram/X sharing, update `og:image` to a fully qualified URL when your final domain is known; preview image is at `assets/img/social-preview.png`.

## Files

- `index.html` — finished landing page with token utility, five founding tiers, calculator, tokenomics, gaming, AI, FAQs, and wallet desk.
- `assets/css/` — responsive site design.
- `assets/js/config.js` — public configuration.
- `assets/js/site.js` — calculator, menu and countdown.
- `assets/js/exchange.js` — wallet connection, on-chain quote/claim, swap link and GAM transfer logic, disabled by default.
- `whitepaper/Gambit_Whitepaper_v2_2.pdf` — updated nine-page whitepaper.
- `whitepaper/Gambit_Whitepaper_v2_2.md` — editable whitepaper source.
- `docs/previews/` — desktop and mobile screenshots.
- `tests/` — static and wallet safety checks.

## Release and communications boundaries

This is a production-quality **static marketing site**, not evidence of operational gambling infrastructure. No licences, audited contracts, certified games, contract deployments or liquidity are independently verified by these files. Purchasing, withdrawals and wagering are not live. Confirm the crypto financial-promotion rules and local gambling advertising restrictions before making the site publicly accessible as a sale invitation. Avoid claiming assured returns, a functioning casino or regulatory approval without evidence.

This matters in the UK in particular: FCA rules restrict investment incentives linked to crypto purchases, and UKGC rules prohibit combining casino and betting products within a single gambling incentive. These limitations must be addressed before public presale promotion or operation even if the code is ready.
