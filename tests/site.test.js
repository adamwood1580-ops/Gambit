/* Run after local website is loaded using a browser test harness; logic checked here. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const html=fs.readFileSync(path.resolve(__dirname,'../index.html'),'utf8');
const css=fs.readFileSync(path.resolve(__dirname,'../assets/css/styles.css'),'utf8');
const js=fs.readFileSync(path.resolve(__dirname,'../assets/js/site.js'),'utf8');
assert.ok(html.includes('7<span>%</span>'),'Missing the $50-$99.99 Bronze tier');
assert.ok(html.includes('70<span>%</span>'),'Missing Angel tier');
assert.ok(html.includes('whitepaper/Gambit_Whitepaper_v2_0.pdf'));
assert.ok(html.includes('PROJECT CONCEPT / TESTNET DEVELOPMENT'));
assert.ok(html.includes('2026')===false,'Avoid frozen hard-coded footer year');
assert.ok(css.includes('@media(max-width:650px)'),'Missing responsive styles');
assert.ok(js.includes('Math.max(0,profit)*tier.rate'),'Bonuses should apply to positive daily profit only');
assert.ok(!js.includes('eth_sendTransaction')&&!js.includes('wallet_requestPermissions'),'Static site must not execute transactions');
console.log('8 source structure checks passed');
