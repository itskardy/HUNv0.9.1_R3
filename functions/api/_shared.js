export const VERSION='0.9.1';
export const SCREENS=['home','list','algorithm','drug','key','fav','search','patient','tools','dose'];
export const TERMS=['gogus agrisi','gogus agrisi terleme','terleme','nefes darligi','dispne','bayilma','senkop','carpinti','nobet','konvulziyon','ates','bas agrisi','kanama','bilinc kaybi','kusma','karin agrisi','[serbest metin gönderilmedi]'];
export const response=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export async function readBody(request,keys,limit){
 if(request.method!=='POST')throw 405;
 if(request.headers.get('Origin')!==new URL(request.url).origin)throw 403;
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))throw 415;
 if(Number(request.headers.get('Content-Length')||0)>limit)throw 413;
 const reader=request.body?.getReader();if(!reader)throw 400;let chunks=[],size=0;
 while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>limit){await reader.cancel();throw 413;}chunks.push(value);}
 const all=new Uint8Array(size);let offset=0;for(const chunk of chunks){all.set(chunk,offset);offset+=chunk.byteLength;}
 let b;try{b=JSON.parse(new TextDecoder().decode(all));}catch{throw 400;}
 if(!b||typeof b!=='object'||Array.isArray(b)||Object.keys(b).some(k=>!keys.includes(k)))throw 400;
 return b;
}
