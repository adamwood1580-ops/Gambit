/* Gambit public website configuration. Everything here is PUBLIC. No secrets. */
window.GAMBIT = Object.freeze({
  version: '2.0.0',
  launchAt: null, // e.g. '2027-03-01T18:00:00Z'; null = TBA
  presaleUsdPrice: 0.0001, // planning price, NOT an executable quote
  walletCapUsd: 1000,
  totalSupply: '100000000000000',
  saleSupply: '10000000000000',
  // Intentionally omitted until verified; never publish made-up links.
  telegramUrl: '',
  xUrl: '',
  contractAddress: '',
  presaleAddress: '',
  // Presentation-only; not wired to a sale contract or wager backend.
  previewOnly: true,
  chainId: 97
});
