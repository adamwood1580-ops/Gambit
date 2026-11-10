"""Run with `python tests/browser_smoke.py`. Uses an IN-MEMORY fake wallet; never sends real transactions."""
from pathlib import Path
import http.server, functools, threading, json
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parent.parent
class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args): pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0), functools.partial(QuietHandler,directory=str(ROOT)))
threading.Thread(target=server.serve_forever,daemon=True).start()
HTML=(ROOT/'index.html').read_text()
def render(config=None, mock=''):
  if config is None: config=(ROOT/'assets/js/config.js').read_text()
  content=HTML
  content=content.replace('<link rel="preconnect" href="https://fonts.googleapis.com"/>','').replace('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>','')
  import re
  content=re.sub(r'<link href="https://fonts\.googleapis\.com/[^"]+" rel="stylesheet"/>','',content)
  content=content.replace('<link rel="stylesheet" href="assets/css/styles.css"/>','<style>'+ (ROOT/'assets/css/styles.css').read_text() + '</style>')
  content=content.replace('<link rel="stylesheet" href="assets/css/exchange.css"/>','<style>'+ (ROOT/'assets/css/exchange.css').read_text() + '</style>')
  content=content.replace('<script defer src="assets/js/config.js"></script>', '')
  content=content.replace('<script defer src="assets/js/site.js"></script>', '')
  content=content.replace('<script defer src="assets/js/exchange.js"></script>', '')
  scripts = '<script>' + config + '</script>' + '<script>'+(ROOT/'assets/js/site.js').read_text()+'</script>' + '<script>'+(ROOT/'assets/js/exchange.js').read_text()+'</script>'
  if mock: scripts='<script>'+mock+'</script>'+scripts
  content=content.replace('</body>', scripts+'</body>')
  return content
A='0x'+'1'*40
TOKEN='0x'+'2'*40
SALE='0x'+'3'*40
CHAIN='0x61'
CONFIG=(ROOT/'assets/js/config.js').read_text()
M=('''
(() => {
  const A="'''+A+'''", TOKEN="'''+TOKEN+'''", SALE="'''+SALE+'''";
  const u = x => '0x' + BigInt(x).toString(16).padStart(64,'0');
  const str = s => {
    const bytes=Array.from(s).map(x=>x.charCodeAt(0).toString(16).padStart(2,'0')).join('');
    return '0x'+(32n).toString(16).padStart(64,'0')+BigInt(s.length).toString(16).padStart(64,'0')+bytes.padEnd(64,'0');
  };
  let connected=false, network="'''+CHAIN+'''";
  window.txCalls=[];
  window.ethereum={isMetaMask:true,
  on:()=>{},
  async request({method,params=[]}) {
    if(method==='eth_requestAccounts'){connected=true;return[A];}
    if(method==='eth_accounts')return connected?[A]:[];
    if(method==='eth_chainId')return network;
    if(method==='wallet_switchEthereumChain'){network=params[0].chainId;return null;}
    if(method==='eth_getBalance')return '0x'+(2n*10n**18n).toString(16);
    if(method==='eth_getCode')return params[0].toLowerCase()===TOKEN||params[0].toLowerCase()===SALE?'0x6001':'0x';
    if(method==='eth_call'){
      const {to,data}=params[0];
      const selector=data.slice(2,10);
      if(to.toLowerCase()===TOKEN){
        if(selector==='95d89b41')return str('GAM');
        if(selector==='313ce567')return u(18);
        if(selector==='70a08231')return u(1000n*10n**18n);
      }
      if(to.toLowerCase()===SALE){
        if(selector==='a0fc44f5')return u(BigInt(TOKEN));
        if(selector==='8471d8ce')return u(100000000000000n);
        if(selector==='cc37c3d1')return u(1000n*10n**18n);
        if(selector==='1a081330')return u(1);
        if(selector==='b3f05b97'||selector==='9a82a09a'||selector==='a453d494')return u(0);
        if(selector==='dcbeaf8c')return u(1000n*10n**18n);
        if(selector==='de54c59c'||selector==='2c9115c7'){
          const bnb=BigInt('0x'+data.slice(10));
          const usd=bnb*600n;
          return selector==='de54c59c'?u(usd):u(usd*10n**18n/100000000000000n);
        }
      }
      throw new Error('Unknown contract read '+selector);
    }
    if(method==='eth_sendTransaction'){
      window.txCalls.push(params[0]);return '0x'+'a'.repeat(64);
    }
    throw new Error('Unexpected RPC '+method);
  }};
})()
''')

def check_page(page):
  bad=page.evaluate('document.documentElement.scrollWidth > innerWidth + 2')
  assert not bad, f'Page horizontally overflows at {page.viewport_size}'
  errs=[]
  page.on('pageerror', lambda e: errs.append(str(e)))
  assert page.locator('#exchange').count()==1
  assert page.get_by_role('tab', name='SWAP').count()==1
  assert page.get_by_text('GAMBIT / WALLET DESK').count()==1
  assert not errs, f'JS errors: {errs}'

with sync_playwright() as p:
  browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium',args=['--no-sandbox'])
  for width,height,name in [(1440,900,'desktop'),(390,844,'mobile')]:
    page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
    page.set_content(render(), wait_until='domcontentloaded')
    page.locator('#exchange').scroll_into_view_if_needed()
    page.wait_for_timeout(350)
    check_page(page)
    assert not page.locator('#desk-tx-link').is_visible()
    page.add_style_tag(content='.header {position:relative!important;}')
    page.locator('#exchange').screenshot(path=str(ROOT/'docs/previews'/f'exchange_{name}.png'),animations='disabled')
    page.get_by_role('tab',name='SWAP').click()
    assert page.locator('#desk-swap').is_visible()
    assert page.locator('#desk-dex-link').get_attribute('aria-disabled')=='true'
    page.close()
  # Connect mocked wallet to a mock v1.4 token & presale, but NEVER allow live transactions.
  page=browser.new_page(viewport={'width':1200,'height':900})
  page.set_content(render(config=CONFIG.replace("presaleAddress: ''",f"presaleAddress: '{SALE}'"),mock=M), wait_until='domcontentloaded')
  page.locator('#desk-connect').click()
  page.wait_for_function("document.getElementById('desk-gam-balance').textContent.includes('1,000')")
  assert '1,000' in page.locator('#desk-gam-balance').inner_text()
  page.locator('#desk-buy-amount').fill('0.1')
  page.wait_for_function("document.getElementById('desk-usd-quote').textContent === '$60'")
  assert '600,000' in page.locator('#desk-gam-quote').inner_text()
  assert page.locator('#desk-buy').is_disabled()
  assert page.locator('#desk-claim').is_disabled()
  page.get_by_role('tab',name='SEND GAM').click()
  page.locator('#desk-recipient').fill('0x'+'4'*40)
  page.locator('#desk-send-amount').fill('20')
  assert page.locator('#desk-send').is_disabled()
  assert page.evaluate('window.txCalls.length')==0
  page.close()
  # Simulated live config, fake chain and wallet only: one simulated purchase request.
  page=browser.new_page(viewport={'width':1200,'height':900})
  enabled=CONFIG.replace("presaleAddress: ''",f"presaleAddress: '{SALE}'").replace('previewOnly: true','previewOnly: false').replace('liveTransactionsEnabled: false','liveTransactionsEnabled: true')
  page.set_content(render(config=enabled,mock=M), wait_until='domcontentloaded')
  page.locator('#desk-connect').click()
  page.wait_for_function("document.getElementById('desk-gam-balance').textContent.includes('1,000')")
  page.locator('#desk-buy-amount').fill('0.1')
  page.wait_for_function("document.getElementById('desk-buy').disabled === false")
  page.locator('#desk-buy').click()
  page.wait_for_function('window.txCalls.length === 1')
  assert page.evaluate('window.txCalls[0].to.toLowerCase()')==SALE
  assert page.evaluate('window.txCalls[0].data.slice(0,10)')=='0x3610724e'
  assert page.evaluate('window.txCalls[0].value')=='0x16345785d8a0000' # 0.1 BNB in wei
  assert page.locator('#desk-tx-link').is_visible()
  page.get_by_role('tab',name='SEND GAM').click()
  page.locator('#desk-recipient').fill('0x'+'4'*40)
  page.locator('#desk-send-amount').fill('20')
  assert page.locator('#desk-send').is_enabled()
  page.locator('#desk-send').click()
  page.wait_for_function('window.txCalls.length === 2')
  assert page.evaluate('window.txCalls[1].to.toLowerCase()')==TOKEN
  assert page.evaluate('window.txCalls[1].data.slice(0,10)')=='0xa9059cbb'
  assert page.evaluate('window.txCalls[1].value')=='0x0'
  page.close()
  browser.close()
server.shutdown()
print('Browser smoke PASS: desktop/mobile; mock wallet quote + disabled safety; simulated contract buy transaction')
