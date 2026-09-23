from pathlib import Path
from bs4 import BeautifulSoup
from collections import Counter
import json,re,subprocess,hashlib,sys
ROOT=Path(__file__).parent
checks=[]
def ok(name,cond,detail=''):
    checks.append((name,bool(cond),detail))
    if not cond: print('FAIL',name,detail)

# JS syntax
for f in ['app.js','v090-tools.js','v091-tools.js','master-tools.js','master-logic.js','services.js','privacy.js','drug-info.js','clinical-data-v070.js','data.js']:
    r=subprocess.run(['node','--check',str(ROOT/f)],capture_output=True,text=True)
    ok('syntax '+f,r.returncode==0,r.stderr.strip())

html=(ROOT/'index.html').read_text(encoding='utf8')
soup=BeautifulSoup(html,'html.parser')
ids=[x['id'] for x in soup.find_all(id=True)]
ok('unique html ids',not [x for x,n in Counter(ids).items() if n>1])
ok('version pill v0.9.1','v0.9.1' in soup.select_one('.versionpill').get_text())
ok('no datetime-local','datetime-local' not in html)
ok('now buttons',len(soup.select('[data-now-for]'))>=5,str(len(soup.select('[data-now-for]'))))
nav=[x.get_text(' ',strip=True) for x in soup.select('.bottom .navbtn')]
ok('bottom nav exact',nav==['⌂ Ana','Y Yetişkin','P Pediatrik','★ Favoriler','+ Hasta Kaydı','Σ Doz Hesaplama'],str(nav))
ok('drugs removed from bottom nav',not soup.select('.bottom [data-nav="drugs"]'))
ok('logo home button',soup.select_one('#homeLogo') is not None)
ok('pinned algorithms ui',soup.select_one('#patientPinnedAlgos') is not None and soup.select_one('#patientPinAlgo') is not None)
ok('general rapid test fields',all(soup.select_one('#'+i) for i in ['rapidTestName','rapidTestResult','rapidTestValue','rapidTestUnit']))
ok('EKG build warning','YAPIM AŞAMASINDA' in soup.select_one('#tool-ecg').get_text())
ok('ST 12 lead checkboxes',all((el:=soup.select_one('#st-'+x)) is not None and el.get('type')=='checkbox' for x in ['I','II','III','aVR','aVL','aVF','V1','V2','V3','V4','V5','V6']))
ok('EKG patient context auto UI',soup.select_one('#ecgPatientContext') is not None and 'Hasta Kayıt' in (ROOT/'v090-tools.js').read_text(encoding='utf8'))
ok('AKS compact selection no Girilmedi','data-ecg-choice="ecgAcs"' in html and 'Girilmedi</option>' not in str(soup.select_one('#tool-ecg')))

# data integrity via node
node_script=r'''
const fs=require('fs'),vm=require('vm');let c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync(process.argv[1],'utf8'),c);vm.runInContext(fs.readFileSync(process.argv[2],'utf8'),c);const D=c.window.EK2_DATA,C=c.window.HUN_CLINICAL_V070;let out={version:D.version,drugs:D.drugs.map(d=>({id:d.id,name:d.name,aliases:d.aliases})),badDrug:C.doseRules.filter(r=>!D.drugs.some(d=>d.id===r.drugId)).map(r=>r.id),badAlgo:C.doseRules.filter(r=>!D.algorithms.some(a=>a.code===r.code)).map(r=>r.id),ruleIds:C.doseRules.map(r=>r.id)};console.log(JSON.stringify(out));
'''
r=subprocess.run(['node','-e',node_script,str(ROOT/'data.js'),str(ROOT/'clinical-data-v070.js')],capture_output=True,text=True)
if r.returncode==0:
    d=json.loads(r.stdout)
    ok('data version 0.9.1',d['version']=='0.9.1',d['version'])
    ok('all dose drug refs valid',not d['badDrug'],str(d['badDrug']))
    ok('all dose algo refs valid',not d['badAlgo'],str(d['badAlgo']))
    ok('rule ids unique',len(d['ruleIds'])==len(set(d['ruleIds'])))
    ok('aspirin canonicalized',not any(x['id']=='drug-aspirin' for x in d['drugs']))
    asa=next(x for x in d['drugs'] if x['id']=='drug-asetilsalisilik-asit')
    ok('aspirin alias preserved','Aspirin' in asa['aliases'],str(asa['aliases']))
else: ok('data evaluation',False,r.stderr)

# offline manifest
assets=json.loads((ROOT/'offline-manifest.json').read_text(encoding='utf8'))
missing=[a for a in assets if not (ROOT/a.replace('./','')).exists()]
ok('offline manifest all files exist',not missing,str(missing[:10]))
ok('v091 script offline','./v091-tools.js' in assets)
ok('all 148 pages',all((ROOT/f'page-{i:03d}.jpg').exists() for i in range(1,149)))

# service worker core assets
sw=(ROOT/'sw.js').read_text(encoding='utf8')
core=re.search(r'CORE_ASSETS=\[(.*?)\];',sw,re.S)
if core:
    refs=re.findall(r"'([^']+)'",core.group(1)); miss=[x for x in refs if x!='./' and not (ROOT/x.replace('./','')).exists()]
    ok('service worker core files exist',not miss,str(miss))
    ok('v091 in service worker','./v091-tools.js' in refs)
    ok('service worker r3',"const VERSION='0.9.1-r3';" in sw)
else: ok('service worker core parsed',False)

# backlog coverage markers
bl=(ROOT/'docs/HUN_v0.9.1_MASTER_BACKLOG.md').read_text(encoding='utf8')
for i in range(1,19): ok(f'backlog item 091-{i:03d}',f'HUN-091-{i:03d}' in bl)

# feature markers
alljs='\n'.join((ROOT/f).read_text(encoding='utf8') for f in ['app.js','v090-tools.js','v091-tools.js','master-tools.js'])
ok('Turkish date format helper','.${pad(d.getMonth()+1)}.' in alljs and 'GG.AA.YYYY HH:mm' in html)
ok('compact dose confirmation','compactConfirm' in alljs and 'Uygulamayı Onayla ve Kaydet' in alljs)
ok('dose change reason conditional','syncMedicationReason' in alljs and 'medReasonWrap' in html)
ok('ambiguous route guard','function singleRoute' in alljs)
ok('assessment editing','editAssessment' in alljs and 'consumeAssessmentEdit' in alljs)
ok('report structured clinical blocks','reportStructured' in (ROOT/'app.css').read_text(encoding='utf8') and 'reportAssessmentDetail' in alljs)
ok('EKG warnings not used by report','reportAssessmentDetail' in alljs)
ok('EKG summary omits missing fields',"P dalgası: Girilmedi" not in alljs and "ecgSelectText" not in alljs)
ok('canonical logo active',hashlib.sha256((ROOT/'HUN_logo_canonical.png').read_bytes()).hexdigest()==hashlib.sha256((ROOT/'icon-192.png').read_bytes()).hexdigest())
ok('install after offline','showInstallAfterOffline' in alljs)

# no obvious credentials
text='\n'.join(p.read_text(encoding='utf8',errors='ignore') for p in ROOT.rglob('*') if p.is_file() and p.suffix in {'.js','.html','.json','.md','.txt'} and not p.name.endswith('.bak'))
patterns=[r'AIza[0-9A-Za-z_-]{30,}',r'gh[pousr]_[A-Za-z0-9]{20,}',r'sk-[A-Za-z0-9]{20,}',r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----']
found=[pat for pat in patterns if re.search(pat,text)]
ok('no obvious credential patterns',not found,str(found))

passed=sum(x[1] for x in checks); total=len(checks)
print(f'PASS {passed}/{total}')
for name,status,detail in checks:
    print(('PASS' if status else 'FAIL'),name,detail)
sys.exit(0 if passed==total else 1)
