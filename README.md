# GAMBIT — Showcase Website v2.0

A fully static, mobile-first GAMBIT project showcase for **GitHub Pages**. It explains the proposed GAM tokenomics, five founding tiers (5% / 7% / 20% / 50% / 70%), a daily net-profit bonus model, proposed crypto casino, Angel Vault, sportsbook/event markets, Gambit AI and a staged roadmap.

**Development/preview only.** Nothing here opens a sale, accepts a wallet signature, collects money or accepts gambling bets. All features described as planned have not been verified as deployed. The PDF whitepaper is included and linked from the site.

## What's included

- `index.html` — complete single-page project showcase (no framework, no build process)
- `assets/css/styles.css` — full responsive styles
- `assets/js/config.js` — editable launch date, presale planning price, optional socials
- `assets/js/site.js` — tier and GAM profit-bonus simulator, optional countdown and mobile menu
- `assets/img/` — brand mark, favicon and Telegram/X social share preview image
- `whitepaper/Gambit_Whitepaper_v2_0.pdf` — 11-page illustrated whitepaper
- `whitepaper/Gambit_Whitepaper_v2_0.md` — editable whitepaper source
- `docs/previews/` — desktop and mobile full-page image captures
- `docs/TELEGRAM_MEDIA_KIT.md` — draft community messaging and sharing guidance
- `docs/LAUNCH_CHECKLIST.md` — practical release controls
- `.nojekyll`, `robots.txt`, `tests/` — GitHub Pages compatibility and checks

## Deploy to GitHub Pages

1. Create a GitHub repository (e.g. `gambit-showcase`) or choose the existing GAMBIT Pages repo. If replacing the existing `index.html`, the old presale landing page will no longer be the homepage. Keep a backup if you want to preserve it.
2. Unzip and upload **the contents of this directory** to the repository root. Make sure `index.html` is at the root—not inside an extra subfolder.
3. In GitHub open **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, then **main / (root)**, and save.
4. GitHub will provide an HTTPS Pages URL. A custom domain can be configured in the Pages settings later.
5. Before publication outside a technical preview, complete the launch checklist and independent marketing/regulatory review. GitHub Pages is public even with `robots.txt` disallow rules.

## Edit launch data

Open `assets/js/config.js`:

```js
launchAt: null, // replace with e.g. '2027-02-01T18:00:00Z' (ISO8601 with timezone)
presaleUsdPrice: 0.0001, // the *provisional* presale rate
telegramUrl: '', // insert the official HTTPS Telegram channel URL once created
xUrl: '', // optional; no X button yet
```

- Countdown displays **TBA** while `launchAt` is `null`. The timer doesn't enable purchases.
- The demo simulator recalculates at `presaleUsdPrice`. If you change the planning price, update the whitepaper and token contract planning separately; the smart-contract price is the ultimate source for any live sale.
- No wallet address, RPC, contract ID or live buy endpoint is configured here. Do not add any real payment instructions or transaction capability without independent audit and approval.
- Add your Telegram URL only once you control the official channel. It reveals an actual community link instead of a placeholder.
- For social previews, update `<meta property="og:image">` in `index.html` to the **full absolute HTTPS URL** for `assets/img/social-preview.png` once your site domain is known; preview bots often ignore relative image URLs.
- `robots.txt` is set to `Disallow: /` for a technical preview. This is not access control and must not be relied on for privacy. Adjust it only when the public marketing release has been cleared.

## Tier boundaries

| Verified USD-equivalent presale contribution to a wallet | Founding tier | Proposed bonus rate |
|---|---|---:|
| $0 (no purchase) | No founding tier | 0% |
| $0.01–$49.99 | Starter | 5% |
| $50.00–$99.99 | Bronze | **7%** |
| $100.00–$499.99 | Silver | 20% |
| $500.00–$999.99 | Gold | 50% |
| Exactly $1,000 (per-wallet cap) | Angel | 70% |

Bonus is proposed only on **positive eligible daily net GAM profit** and would be subject to disclosed product rules, caps and funding. This is an illustration, not a guarantee of profits. Casino and sports programmes cannot be combined into a single mixed-product incentive in Great Britain under the January 2026 rule changes.

## Verify locally

- Run `node tests/site.test.js` for source and tier fixture checks.
- Open `index.html` in a modern desktop or mobile browser. External Google Fonts are optional; system-font fallbacks work without the internet.
- Test the two simulator fields, tier thresholds, countdown, accordion, mobile menu and whitepaper PDF links.

The source was visually checked at desktop 1440px and mobile 390px, and its JavaScript logic was tested. This does not constitute a security, accessibility, legal or production infrastructure audit.

## Crucial publication safeguards

Advertising a $1,000 crypto presale contribution as a route to enhanced gambling bonuses may count as a **prohibited cryptoasset incentive** in the UK. The promotional content itself may be regulated even when the casino, wager functions and wallet purchase functions are disabled. This package **must not be used as a public marketing campaign directed at UK consumers until qualified legal counsel and the appropriate promotions approval route clear the specific wording and distribution channels**. Gambling licensing and game certification are not established by this package.

Do not put private keys, wallet seed phrases, customer data, admin tokens or API secrets into GitHub Pages source. If eventually handling live wallet purchase data, use independently audited on-chain contracts and trusted external systems with access controls, not a static HTML-only implementation.
