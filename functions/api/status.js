import {response} from './_shared.js';

export function onRequestGet({env}) {
  const checks = {
    RESEND_API_KEY: !!env.RESEND_API_KEY,
    RATE_SALT: !!env.RATE_SALT,
    FEEDBACK_FROM: !!env.FEEDBACK_FROM,
    FEEDBACK_TO: !!env.FEEDBACK_TO,
    FEEDBACK_RATE: !!env.FEEDBACK_RATE
  };

  return response({
    analytics: env.ANALYTICS_ENABLED === 'true' && !!env.HUN_ANALYTICS,
    feedback: Object.values(checks).every(Boolean),
    checks
  });
}
