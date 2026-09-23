const fs=require('fs');
const css=fs.readFileSync(require('path').join(__dirname,'..','app.css'),'utf8');
function ok(cond,msg){if(!cond){console.error('FAIL:',msg);process.exitCode=1}else console.log('PASS:',msg)}
ok(css.includes('body>*:not(#reportModal){display:none!important}'),'non-report app layout removed from print flow');
ok(/#reportModal\{[^}]*position:static!important/.test(css),'report modal uses normal print flow');
ok(/#reportModal \.caseReport\{[^}]*page-break-after:auto!important/.test(css),'report does not force trailing page break');
