# GAMBIT (GAM)

## Product & Token Whitepaper | Version 2.2 | 10 November 2026

> The token. The game. The edge.

**Information notice:** This document describes the Gambit product specification. It is not evidence of a live casino, an active token sale, licensing, game certification or audited contracts. GAM can lose all value and gambling can result in losses.


## 01 — Executive summary

Gambit (GAM) is a BNB Smart Chain cryptoasset designed as the native unit of account for a crypto-only gaming ecosystem. The product framework combines GAM-denominated casino play, an independently administered event sportsbook, a five-level founding reward programme, an Angel-exclusive bonus experience and an AI-assisted data layer.

This paper records the defined Gambit product and presale specifications. It is not evidence that the token has launched, that contracts have passed a security audit, that gaming facilities are operational or that a licence has been issued. Token purchases and gambling are not enabled on the accompanying informational website.


### Five design principles

One token used for account funding and payout; transparent token allocations and supply reductions; fixed founding-tier percentages applied to positive daily net casino results; objectively settled event markets; auditable odds and game mathematics rather than undisclosed personalised outcomes.


## 02 — Token design

Token name: Gambit. Symbol: GAM. Network: BNB Smart Chain. Decimals: 18. Initial token supply: 100,000,000,000,000 GAM (100 trillion). The contract design contains no post-deployment minting function.

| Initial allocation | Share | GAM |
| --- | --- | --- |
| Community (presale + rewards) | 35% | 35 trillion |
| Liquidity | 25% | 25 trillion |
| Development and ecosystem | 15% | 15 trillion |
| Team | 10% | 10 trillion |
| Marketing and partnerships | 10% | 10 trillion |
| Treasury reserve | 5% | 5 trillion |
Within the community allocation, 10 trillion GAM (10% of initial supply) are reserved for presale distribution and 25 trillion GAM (25%) remain for community rewards. The headline six-category distribution does not change.


### Transfer mechanics

Recognised V2 liquidity-pool buys incur a fixed 2% GAM token transfer to the community rewards wallet. Recognised V2 pool sells incur a fixed 2% true on-chain burn that reduces totalSupply(). Ordinary wallet-to-wallet transfers do not incur those trading taxes. Pools that are not recognised by the deployed contract may not trigger the tax rules. V3-style fee-on-transfer incompatibility must be respected.


### Team vesting

The 10-trillion-GAM team allocation is assigned to a vesting mechanism with a 12-month cliff followed by 24 equal monthly releases, first becoming claimable at month 13 and fully vested at month 36. Releases distribute existing tokens and do not mint new GAM.


## 03 — Presale structure

| Presale setting | Defined value |
| --- | --- |
| Presale allocation | 10 trillion GAM |
| GAM presale unit price | $0.0001 USD equivalent |
| Cumulative limit | $1,000 per wallet |
| GAM at $1,000 | 10,000,000 GAM |
| Presale token distribution | Claim/airdrop after sale finalisation |
| Payment mechanism | BNB with reliable contract-based USD conversion |
The $1,000 limit is per wallet address, not per identified person. Multiple addresses are not linked under this stage of the design. Contract accounting must enforce cumulative purchases, not merely a per-transaction limit.

At the announced presale unit price, the entire 10-trillion-GAM sale allocation has a theoretical gross capacity of $1 billion. Multiplying the price by the full initial supply implies a $10 billion fully diluted valuation. Neither number is a fundraising forecast or an indication of market trading value.


### Wallet safety and activation

The static GitHub Pages site can connect an injected browser wallet and read blockchain data. Payment actions remain locked until verified token and presale contract addresses, the intended network and the public-sale activation state have been confirmed. No private keys or recovery phrases are stored by the website.


## 04 — Founding reward levels

A founding reward tier is determined by the total USD-equivalent presale contribution recorded against the participating wallet. The highest applicable threshold applies. Wallets with no qualifying purchase have no founding tier.

| Tier | Presale contribution / wallet | Casino bonus rate |
| --- | --- | --- |
| Starter | Greater than $0 and below $50 | 5% |
| Bronze | $50 to below $100 | 7% |
| Silver | $100 to below $500 | 20% |
| Gold | $500 to below $1,000 | 50% |
| Angel | Exactly $1,000 maximum | 70% |

### Defined positive-net-profit method

One eligible casino reward day runs on UTC time. Daily net GAM profit is the sum of settled eligible casino payouts minus the sum of settled eligible casino stakes. If this is zero or negative, the tier bonus is zero. When positive, the base bonus equals that net profit multiplied by the tier percentage.

A participant may end their reward day early and settle once. Continued play afterward does not create another bonus for that UTC day. Logging out is not treated as a bonus claim event. A midnight UTC close is the default settlement when the participant does not close early.

Example: an Angel wallet with +400 GAM eligible casino net profit receives 280 GAM of additional bonus. The existing 400 GAM net win remains in the gaming balance and is not paid again. The combined net result is +680 GAM.

These percentages do not increase an individual game's probability of winning. The sportsbook, event markets and casino are separate product classes and do not share a combined gambling promotion.


## 05 — Casino and Angel Vault

GAM is the casino account denomination for deposits, bets and withdrawals. Game state, settled bets and balances are held in a reconciled internal ledger; on-chain transactions are used for token deposits and withdrawals rather than every spin. Gaming accounts require independently tested randomness, tamper-resistant settlement and robust safeguards.


### Angel Vault

Angel Vault is the exclusive bonus-game experience for Angel members. Its defining mechanic is access to independently designed bonus rounds, including wager-free spins for a funded prize pot. Access, prize distributions and any maximums belong in published rules for that game. A no-wager spin does not itself establish that access to the promotion is legally free where token purchasing is a prerequisite.


### RTP and founding tiers

The founding bonus percentage and game return-to-player (RTP) are different concepts. A previously discussed 98% RTP Angel-specific game is not part of the founding tier formula. If offered, it requires separate certified mathematics and clear disclosure, without secretly switching random-number behaviour according to a user profile.


## 06 — Sportsbook and event markets

Gambit's event sportsbook framework encompasses football and other sports, golf micro-markets such as whether the next putt is holed, and verifiable real-world outcomes such as election results where the law and market-integrity rules permit.

Each market needs an objectively worded question, a trusted resolution source, an opening and closing condition, auditable accepted odds, appropriate settlement handling for postponements, and controls against stale pricing and information asymmetry. Golf micro-markets additionally require low-latency event feeds and fast market suspension.

Sportsbook incentives must be administered separately from casino promotions wherever mixed-product incentives are not allowed; the founding casino daily-net-profit bonus does not automatically apply to sports or event wagers.


## 07 — Gambit AI and privacy

A generative AI assistant can explain rules, summarise historical odds and answer questions about approved data sources. Statistical and machine-learning models may estimate probabilities, calibrated against observed outcomes; risk checks and published margin rules determine offered odds.

The platform must record offered odds and the exact price accepted for every wager. It must not silently adjust already-accepted odds or manipulate game outcomes according to a user's identity or prior gambling activity.

Personal memory is opt-in and designed for factual account review: past bets, results, saved sports and useful market details. It is not used to encourage chasing losses, extending play after a win or increasing stakes during signs of gambling harm.


## 08 — Risk, governance and disclosures


### Token and operations

Cryptocurrency balances are volatile and can lose all value. Smart contracts, oracle dependencies, private keys, exchange liquidity and cross-service settlement each carry technical or operational risk. A multisignature treasury, audit trail, reserve reconciliation and independently assessed smart-contract security are required controls.


### Rewards sustainability

A bonus of 70% on positive daily gambling profit could materially increase expected player returns and even make some games economically loss-making for the operator. Reward economics require game-level simulation, solvency funding, clearly published eligibility and a separate ring-fenced bonus budget before the promotion can operate. This paper does not represent a promise of unlimited rewards.


### Territorial and regulatory conditions

Gambling access is limited to eligible adults and permitted locations, and to products authorised for those territories. No licence or game certification number has been supplied for independent verification. The public marketing of crypto presale-linked gaming benefits must be reviewed against applicable financial-promotion and gambling-advertising restrictions. A final website cannot itself substitute for that review.

Website version 2.2 presents a finalised product description and fixed numeric design decisions, while purchase and wagering functionality remain inactive pending verified operational connections. The launch date and official community URL are deliberately left unset rather than invented.


---
**Contacts and resources:** Use the official Gambit website and verified on-chain addresses. No recovery phrase is ever required for a wallet connection.
