import {response} from './_shared.js';
export function onRequestGet({env}){return response({analytics:env.ANALYTICS_ENABLED==='true'&&!!env.HUN_ANALYTICS,feedback:!!(env.RESEND_API_KEY&&env.FEEDBACK_TO&&env.FEEDBACK_FROM&&env.FEEDBACK_RATE&&env.RATE_SALT)});}
