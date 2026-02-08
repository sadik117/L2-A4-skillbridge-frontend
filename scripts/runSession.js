const { createAuthClient } = require('better-auth/react');

const authClient = createAuthClient({ baseURL: 'http://localhost:5000' });

(async () => {
  try {
    const res = await authClient.getSession();
    console.log('RESULT:', res);
  } catch (err) {
    console.error('ERROR:', err && err.stack ? err.stack : err);
  }
})();
