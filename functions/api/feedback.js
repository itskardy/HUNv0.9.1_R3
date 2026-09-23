import {readBody,response,VERSION,SCREENS} from './_shared.js';
export async function onRequest(context){
 try{
 const {request,env}=context;if(!(env.RESEND_API_KEY&&env.FEEDBACK_TO&&env.FEEDBACK_FROM&&env.FEEDBACK_RATE&&env.RATE_SALT))return response({configured:false},503);
 const b=await readBody(request,['message','version','screen','device','website'],9000);
 if(typeof b.message!=='string'||b.message.trim().length<10||b.message.length>2000||b.version!==VERSION||!SCREENS.includes(b.screen)||!['mobile','desktop'].includes(b.device)||typeof b.website!=='string')throw 400;
 if(b.website)throw 400;
 // Temporary abuse-control hash, isolated from analytics; never retained with message or patient data.
 const bucket=Math.floor(Date.now()/3600000),ip=request.headers.get('CF-Connecting-IP')||'unknown';
 const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(env.RATE_SALT+'|'+bucket+'|'+ip));
 const key='feedback:'+Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
 const count=Number(await env.FEEDBACK_RATE.get(key)||0);if(count>=5)throw 429;
 await env.FEEDBACK_RATE.put(key,String(count+1),{expirationTtl:3600});
 const text=['HUN geri bildirimi',`Sürüm: ${b.version}`,`Bölüm: ${b.screen}`,`Cihaz: ${b.device}`,'',b.message.trim()].join('\n');
 const res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.FEEDBACK_FROM,to:[env.FEEDBACK_TO],subject:'HUN geri bildirimi',text}),signal:AbortSignal.timeout(10000)});
 if(!res.ok)return response({ok:false},502);return response({ok:true});
 }catch(e){return response({ok:false},Number.isInteger(e)?e:502);}
}
