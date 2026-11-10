# GAMBIT
## The token. The game. The edge.

**GAM (BNB Smart Chain) | Project whitepaper v2.0 | 10 November 2026**

**STATUS: DEVELOPMENT CONCEPT — NOT A LIVE TOKEN OFFER OR GAMBLING SERVICE**

Gambit is a proposed crypto-only gaming ecosystem, funded in part through a planned GAM token presale. GAM is intended to operate as a native gaming balance within an eventual casino and sportsbook platform. Its founding membership tiers would recognise the aggregate USD-equivalent amount contributed by a wallet during the presale. Subject to defined eligibility and affordability constraints, those tiers would determine a GAM bonus based on **positive net gaming profit over one UTC day**, rather than paying a percentage on every winning individual bet.

This document describes a design and its financial and technical risks. It does not claim that Gambit has obtained licences, independent game certification, a security audit, or working live gambling operations. It is not investment advice or an offer to sell GAM. Bonus figures, game concepts and launch milestones are proposals; nothing here guarantees winnings, liquidity or returns.

---

## 1. Executive summary

Gambit combines three proposed layers: (i) a fungible BEP-20-compatible GAM token on BNB Smart Chain; (ii) a crypto-only casino and event-betting account platform, with GAM used for eligible wagers; and (iii) a separately controlled rewards and intelligence layer that processes founding tier entitlements, daily GAM net results, market data and statistical analysis.

The proposed fixed **initial** token supply is 100,000,000,000,000 GAM with 18 decimals and no additional minting function. A 2% tax on qualifying buys through designated V2 liquidity pools would transfer GAM into a community rewards wallet; a 2% tax on qualifying sells through those pools would **burn GAM on-chain**, reducing the reported totalSupply. Ordinary wallet-to-wallet token transfers would remain untaxed. These restrictions do not automatically cover trading through unregistered pools or other venues.

The working presale allocation is 10 trillion GAM, subdivided from the existing 35% community allocation; the remaining 25 trillion GAM is intended for ongoing community rewards. A proposed presale price of $0.0001 per GAM gives 10 million GAM for a $1,000 contribution, with a **cumulative $1,000 USD-equivalent maximum per wallet** across all transactions. Multiple wallets are not linked or restricted under this technical cap.

The gaming platform, live presale and any customer-facing crypto promotion are separate launch dependencies, not functions of this informational website.

## 2. What GAM is for

**Gaming unit:** GAM would be accepted for eligible wagers and denominated balances on the planned platform. Users would deposit GAM into a custodial gaming ledger, bet against that ledger, and withdraw subject to verification and applicable rules. Every individual spin or wager does not need an on-chain BSC transaction.

**Founding tier record:** Each presale wallet's cumulative verified USD-equivalent contribution would establish an initial tier. Tiers would not change merely because users later spend, withdraw, or transfer their GAM holdings. Linking a wallet to a player account needs secure ownership proof and duplication controls.

**Proposed profit bonus:** For each eligible gaming incentive programme, a reward engine would calculate an additional GAM bonus on positive net results for a defined UTC day. Casino and sportsbook programmes require separate designs and must not be pooled into a single mixed-product incentive where such mixing is prohibited.

**Community allocation:** Community reward tokens and token buy-tax receipts may be budgeted toward eligible programmes, but no bonus should be issued unless an adequate, ring-fenced GAM reserve funds the obligation.

**No investment return promise:** GAM is not a deposit or claim on gambling revenue. Token ownership alone provides no fixed financial return; the token price can decline to zero.

## 3. Confirmed working token parameters

| Parameter | Working design |
|---|---|
| Name / symbol | Gambit / GAM |
| Network | BNB Smart Chain |
| Standard | BEP-20-compatible ERC-20 |
| Decimals | 18 |
| Initial supply | 100,000,000,000,000 GAM |
| Future token minting | Disabled |
| Buy tax | Fixed 2% GAM transfer to community reward wallet on registered V2 pool buys |
| Sell tax | Fixed 2% true GAM burn on registered V2 pool sells |
| Ordinary transfers | 0% tax |
| Token deployment | Draft contracts, testnet verification in progress; not audited |

Transfer taxes do not by themselves fund GAM-denominated casino rewards sustainably. Trading fees can lower liquidity and complicate exchange integrations. Fee-on-transfer token support varies between DEX versions and routing methods; the planned v1 token is intended for compatible V2-style pools only. Contract ownership and factory configuration require independent security review.

## 4. Allocation model

| Allocation | % initial supply | GAM tokens | Intended use |
|---|---:|---:|---|
| Community | 35% | 35 trillion | 10T presale + 25T continuing community rewards |
| Liquidity | 25% | 25 trillion | Liquidity provisioning and related locks |
| Development & ecosystem | 15% | 15 trillion | Platform infrastructure, security and operations |
| Team | 10% | 10 trillion | Team entitlement subject to vesting |
| Marketing & partnerships | 10% | 10 trillion | Approved marketing, distribution and partnerships |
| Treasury | 5% | 5 trillion | Reserves and contingency funding |
| **Total** | **100%** | **100 trillion** | No newly minted presale tokens |

The 10T presale supply is not an additional seventh allocation. It sits inside the 35% community allocation. All distribution addresses and contract protections must be verified publicly at actual deployment; at this stage no deployed address is presented as final.

### Team vesting

The working team design is a **12-month cliff followed by 24 equal monthly unlocks**. No team entitlement is withdrawable during the first 12 months. The first release is scheduled for month 13, and all scheduled releases finish at month 36. Each release is approximately 416.67 billion GAM. The specific vault implementation, ownership-transfer permissions, exact vesting timestamps and recovery provisions require audit. A vault holding tokens is not equivalent to locking the exchange liquidity-provider position.

## 5. Presale design and economics

| Presale item | Working proposal |
|---|---|
| Presale inventory | 10,000,000,000,000 GAM |
| Unit price | $0.0001 per GAM |
| At $100 USD | 1,000,000 GAM |
| At $1,000 USD | 10,000,000 GAM |
| Wallet maximum | Cumulative $1,000 USD-equivalent |
| Identity-based cap | None in current contract specification |
| Settlement | BNB-based purchase using verified BNB/USD pricing; claim/airdrop after finalisation |
| Sale state | Disabled pending deployment verification, legal review and launch sign-off |

At full sale of 10T GAM, gross proceeds would equal **$1 billion** and the price times the total initial GAM supply would equal an **implied $10 billion fully diluted valuation**. These are **arithmetic outcomes, not fundraising forecasts, third-party valuations or assurances of future token market prices**. A presale-capacity model of one million $1,000 wallets does not establish one million unique purchasers or demand. A single person may control multiple wallets.

Payment conversion requires a reliable and fresh BNB/USD oracle, explicit slippage bounds, a secure record of cumulative contributed value and enforceable inventory constraints. A funded claim/refund lifecycle should be tested against failed transactions, stale oracles, cancellations, rounding and network interruptions. Public GitHub Pages can host an informational front end, not secret keys or privileged casino ledger operations.

## 6. Founding reward tiers

The following tier percentages are based on the planned verified cumulative contribution of a wallet during the GAM presale, not on the market price of later GAM holdings. A wallet with no contribution would not receive a founding bonus tier.

| Tier | Cumulative presale contribution (USD) | Proposed bonus on positive eligible daily net GAM profit |
|---|---:|---:|
| Starter | More than $0, below $50 | **5%** |
| Bronze | $50 to $99.99 | **7%** |
| Silver | $100 to $499.99 | **20%** |
| Gold | $500 to $999.99 | **50%** |
| Angel | Exactly $1,000 cap | **70%** |

Threshold precision is expressed in cents for readability; contracts and back-end accounting should use integer units and deterministic rounding. Original presale tier entitlements and any later path for new token holders must be kept as separate eligibility policies. The final terms must specify eligible markets, currency conversion, per-day caps, the funding reserve, exclusions, account integrity, abuse controls, bonus expiration if any, and jurisdictional restrictions.

### Reward arithmetic

For one eligible product programme and UTC accounting day:

**Net GAM profit = sum of settled winning payouts (including returned stakes) − sum of all settled GAM stakes.**

**Daily bonus = min[max(0, net GAM profit) × tier rate, published daily bonus cap].**

A player whose positive daily net result is 400 GAM would have a provisional bonus of 20 GAM (Starter), 28 (Bronze), 80 (Silver), 200 (Gold) or 280 (Angel), before any applicable cap. The underlying 400 GAM result is **already included in the player's playing balance**; the rewards ledger credits **only the extra bonus**, not the original result twice.

An eligible player may request the end of their reward day or be settled at the automatic UTC cutoff. **Only one reward settlement can occur per UTC day, and a player may continue playing without another bonus accruing for that day.** Logging out should not alter earned balances or create an additional reward window. Unsettled bets must be deferred to their actual settlement period under published rules; the system must handle cancelled wagers, reversals, cash-outs and disputes consistently.

A reward payment should be withdrawable without further wagering as proposed, subject to ordinary account verification and applicable law. A customer must never have to continue gambling to collect a valid accrued balance.

### Critical bonus sustainability caveat

**The proposed 70% and 50% bonuses could make games economically loss-making for Gambit.** For illustration, in a single even-money wager with a base theoretical RTP of 98%, a win probability of 49% yields a base RTP of 98%; adding a 70% bonus on winning net profit yields an effective expected payout of **132.3% of stakes** for that isolated wager. Daily aggregation across multiple bets changes the distribution and therefore the cost, but does not make the bonus self-funding. Simulations, separated gaming product budgets, daily limits and transparent contractual ceilings are prerequisites to launch. No such limits have yet been agreed.

## 7. Casino and Angel Vault

Gambit envisages slots, table games and distinct bonus-game experiences. Real-money games must use validated mathematics and outcome determination; the operator should disclose game rules, prize structures and the applicable return to player (RTP) and should not quietly modify probabilities for a particular user.

**Angel Vault:** A proposed separate experience involving tier-only or otherwise eligible no-additional-wager spins and pre-funded prize pots. A free spin is not automatically a legally free entry when access depends on a prior token purchase. The structure requires independent legal and game-fairness review. Any prize value, frequency, entitlement or maximum payout is to be decided.

A **98% RTP Angel-specific game configuration** was earlier explored as an optional three-month annual benefit. It is **not a final or guaranteed feature** and should not be stacked with daily profit bonuses until the financial mathematics, certification and lawfulness are proven. RTP is a long-run theoretical statistic, not a player's probability of winning or a guarantee of positive returns.

## 8. Sportsbook and event markets

Possible categories include conventional sports, golf micro-events (such as whether a player makes an upcoming putt), esports and other externally verifiable events. Political events, including by-elections, may be considered only in places and circumstances where those markets are legal and integrity controls are demonstrably adequate.

Each market requires an objectively defined outcome, a reliable licensed source of data, an opening and closing event time, fair odds display, safeguards against stale information, pre-set stake/exposure controls, unambiguous dispute rules, and the ability to suspend the market if the feed is delayed or compromised. In-play micro-betting is especially sensitive to data latency, inside information and the order in which bets are accepted.

Casino and sportsbook bonus programmes need independent product-specific accounting and must not be combined into a single promotional incentive in jurisdictions that prohibit mixed-product rewards. A sportsbook may launch after casino functionality, and not all envisaged market types will necessarily be offered.

## 9. Gambit AI: analytical intelligence, not guaranteed picks

The proposed intelligence layer has three independent roles:

1. **Market discovery and summarisation:** Given approved market catalogues and data, an assistant can explain factual context, published terms and relevant statistics. Natural-language suggestions are informational, opt-in and non-coercive.
2. **Statistical probability modelling:** Calibrated models can combine historical performance, current event context and trusted licensed feeds to estimate an initial fair probability. A fair decimal price is approximately `1 / probability` before permitted margin and exposure controls. These estimates require back-testing, calibration checks, governance and human-supervised limits.
3. **User-controlled bet history:** With consent, an account can display previous wagers, price movement, results, favourite categories and risk summaries. Personalisation must not exploit losses, vulnerability, time spent or compulsive behaviour to push further wagering.

An LLM should **never independently invent sportsbook odds**, manipulate a live game RNG, change accepted bets after the fact, or autonomously create an unreviewed real-money betting market. Odds publication and liability management belong to a deterministic, auditable risk engine; market outcomes require independently verifiable settlement feeds.

An illustrative putt example: a calibrated 40% probability corresponds to fair decimal odds of 2.50 before bookmaker margin. This is an example of arithmetic, not a real-world prediction or a quote offered by Gambit.

## 10. Platform architecture

**Layer A — BSC smart contracts:** Token transfers and circulating supply, registered liquidity-pool taxation, allocation custody, team vesting, sale contribution accounting, claim/refund mechanics and on-chain wallet funding records.

**Layer B — Custodial gaming ledger:** Authenticated accounts, proof of wallet ownership, GAM deposit confirmations, double-entry transaction accounting, segregated customer-fund records, withdrawals, anti-fraud limits, incident controls and immutable audit trails. The ledger must reconcile all customer liabilities to segregated on-chain reserves.

**Layer C — Game and market engines:** Independently tested casino RNG/game configurations and a sportsbook engine with licensed data sources, market suspension, settlement verification and recorded accepted odds.

**Layer D — Rewards and membership:** Per-wallet presale tier registry, secure account mapping, separated casino/sports net-profit calculations, UTC-day snapshots, one-settlement-per-day rules, separate bonus reserve accounting, auditable credit transactions and appeal handling.

**Layer E — AI and controls:** Data ingestion, calibrated statistical models, model monitoring and logging, optional user-visible explanations, abuse detection, risk management and responsible-play alerts.

The public GitHub Pages site is only a static informational surface. It is not the casino backend, an on-chain oracle, a payment processor or proof that any described component is deployed.

## 11. Security and operational assurance

Before any real-value launch, the programme requires independent reviews of smart-contract access controls, vesting, buy/sell tax routing, liquidity registration, presale accounting, BNB oracle quality, refund permissions, edge cases, reentrancy, rate limits, wallet address management, treasury multisig permissions and chain reorganisation handling.

The casino platform additionally requires tested RNG, secure encryption, secrets management, penetration testing, customer asset reconciliation, proof of solvency/segregation where relevant, account takeover protections, age and identity verification, sanctions/AML processes, fraud and bonus abuse detection, suspicious bet monitoring, disaster recovery and player-dispute processes. A static public site must contain no private keys, recovery phrases or admin credentials.

The design should publish verifiable token contracts and wallet allocations only after deployed addresses have been checked against the intended chain. Never substitute an unverified address in the presale front end.

## 12. Responsible play and transparent marketing

Gambling losses are possible on every wager, even for high-tier accounts. No founding membership promises profit or a preferential chance of success. The platform should implement jurisdiction-appropriate age and identity checks, self-exclusion, customer financial/time limits, reality checks, risk interventions and accessible account histories. Bonus credit should not be conditioned on additional gambling, and customer support must be able to correct settlement errors.

The planned Telegram community should be **opt-in, age-appropriate, and moderated**. It may discuss product progress and explain public documents, but it should not use fabricated scarcity, false audit or licence badges, guaranteed payout claims, pressure to chase losses, misleading “investment” language, or unsupported projections. Avoid targeting minors and people known to be vulnerable to gambling harms. Do not present user-selected “degen” language as a reason to remove safeguards.

## 13. Legal and licensing assumptions

For product planning, the team may assume that suitable licences and certifications will ultimately be obtained. **No statement in this whitepaper asserts that this has happened.** Crypto financial promotion law may affect the presale and any purchase-linked tier benefit even before casino games launch. In Great Britain, the FCA's financial-promotion framework for qualifying cryptoassets includes restrictions on incentives to invest. Great Britain's gambling regulator licenses remote casino and betting operations and sets technical and marketing rules.

As of the reference date, the UK Gambling Commission's 19 January 2026 update bars incentives that combine different gambling product types, including casino and betting, within one promotion. Separate, lawful bonus rules and budgets may be needed; the exact proposed structure requires qualified legal analysis. Other jurisdictions may ban particular games or event outcomes altogether. This whitepaper is not legal advice.

## 14. Roadmap and status

| Phase | Objective | Status at publication |
|---|---|---|
| 1 | GAM contract, allocations, tax and vesting tests | Draft/testnet development |
| 2 | Presale contract, wallet cap, oracles and claim/refund lifecycle | Draft, disabled |
| 3 | Secure GAM gaming ledger and approved daily bonus calculation | Proposed |
| 4 | Tested casino game integrations and standalone bonus concepts | Planned |
| 5 | Sportsbook feeds, odds risk engine and market settlement | Research |
| 6 | Optional bet-history assistant and mature AI price models | Research |

Dates, launches, exchange listings and revenue projections are **not committed**. Technical completion must be distinguished from security review, marketing approval and live operating authorisation.

## 15. Risk factors and what is not yet decided

- **Token and market risk:** GAM may be illiquid or lose all its value. There is no promise of an exchange listing, token appreciation or buyer liquidity.
- **Economic risk:** The proposed 50% and 70% daily profit bonuses can exceed sustainable expected margins and require re-design, caps and funded reserves.
- **Technical risk:** Vulnerabilities in wallets, presale, game ledger, cross-system reconciliation, live data feeds and settlement can create losses.
- **Operational and counterparty risk:** A custodial gaming wallet creates duties to safeguard assets and handle withdrawals even during service interruptions.
- **Regulatory risk:** Presale marketing, token incentives, casino games, sports betting, election markets, bonus games and crypto payments may face different restrictions depending on jurisdiction.
- **Price/feed risk:** BNB/USD oracles, delayed sportsbook data and market volatility can make prices inaccurate or cause pauses.
- **Concentration risk:** Multiple wallets can be controlled by a single buyer and a small number of accounts may dominate liquidity or redemptions.
- **Unresolved design:** Bonus maximums; product eligibility; future post-presale tiers; reward budget; gamer account model; live game suppliers; precise launch timing; supported markets; governance and treasury disclosures.

## 16. Reference framework

The following official material informed the draft's discussion of controls; readers should verify current requirements before any launch:

1. UK Financial Conduct Authority, *Cryptoasset financial promotions and fiat-to-crypto on/off ramp services*, updated February 2026: https://www.fca.org.uk/firms/cryptoasset-financial-promotions-and-fiat-crypto-ramp-services
2. FCA, *PS23/6 Financial promotion rules for cryptoassets*: https://www.fca.org.uk/publications/policy-statements/ps23-6-financial-promotion-rules-cryptoassets
3. UK Gambling Commission, *Remote gambling and software technical standards*: https://www.gamblingcommission.gov.uk/licensees-and-businesses/guide/remote-gambling-and-software-technical-standards
4. UK Gambling Commission, *Socially responsible incentives: what operators need to know*, December 2025: https://www.gamblingcommission.gov.uk/blog/post/socially-responsible-incentives-what-operators-need-to-know
5. UK Gambling Commission, *Licence condition 5.1.6 - Compliance with advertising codes*: https://www.gamblingcommission.gov.uk/licensees-and-businesses/lccp/condition/5-1-6-compliance-with-advertising-codes
6. UK Gambling Commission, *Apply for a licence to operate a gambling business*: https://www.gamblingcommission.gov.uk/service/apply-for-an-operating-licence

---

**GAMBIT — THE TOKEN. THE GAME. THE EDGE.**  
**Whitepaper v2.0 / 10 November 2026 / Project concept / Not an invitation to invest or gamble.**
