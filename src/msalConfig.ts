import { PublicClientApplication, LogLevel } from '@azure/msal-browser';

const msalConfig = {
  auth: {
    clientId:
      (import.meta.env.VITE_APP_CLIENT_ID), // Your B2C client ID
    authority:
      'https://takafoplus.b2clogin.com/takafoplus.onmicrosoft.com/B2C_1_takafo_plus-signin_flow', // Your user flow URL
    redirectUri:
      (import.meta.env.VITE_APP_REDIRECT_URI), // Your local callback URL
    knownAuthorities: ['takafoplus.b2clogin.com'], // Your Azure B2C tenant name
    navigateToLoginRequestUrl: false, // Set to false if you want to control the navigation after login
  },
  cache: {
    cacheLocation: 'sessionStorage', // Use session storage for caching
    storeAuthStateInCookie: false, // Set to true if you're facing issues with IE or Edge
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

// https://satakafostagingportal.z1.web.core.windows.net/v1/auth/azure/callback
// clientId: '78335d25-c59f-4b2c-b3d9-909c847f0ba7', // Your B2C client ID
