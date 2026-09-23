import {readBody,response,VERSION,SCREENS,TERMS} from './_shared.js';
export async function onRequest(context){
 try{
  const {request,env}=context;if(env.ANALYTICS_ENABLED!=='true'||!env.HUN_ANALYTICS)return response({enabled:false},503);
  const b=await readBody(request,['event','screen','detail','version','device'],768);
  if(!['page_view','algorithm_open','search','dose_use','tool_use','ecg_use'].includes(b.event)||!SCREENS.includes(b.screen)||b.version!==VERSION||!['mobile','desktop'].includes(b.device)||typeof b.detail!=='string')throw 400;
  if(b.event==='search'&&!TERMS.includes(b.detail))throw 400;
  if(b.event==='algorithm_open'&&!/^SB-ASH-(Y|Ç|DY)-\d{2}$/.test(b.detail))throw 400;
  if(!['search','algorithm_open'].includes(b.event)&&b.detail!=='')throw 400;
  // No body passthrough, identifiers, cookies, referrer, exact location, raw IP, drug, or clinical fields.
  const city=typeof request.cf?.city==='string'?request.cf.city.slice(0,80):'unknown';
  env.HUN_ANALYTICS.writeDataPoint({blobs:[b.event,b.screen,b.detail,b.version,b.device,city],doubles:[1],indexes:[]});
  return response({ok:true});
 }catch(e){return response({ok:false},Number.isInteger(e)?e:500);}
}
