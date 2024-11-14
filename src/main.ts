import { createApp } from 'vue';
import Vue3Lottie from 'vue3-lottie';
import App from './App.vue';
import { registerPlugins } from '@/plugins';
import '@/assets/icomoon/style.css';
import '@/assets/styles/scss/global.scss';
import { msalInstance } from './msalConfig';
import requestInterceptorUtils from '@/utils/request-interceptor.utils';
import responseInterceptorUtils from '@/utils/response-interceptor.utils';

const app = createApp(App);

app.use(Vue3Lottie);

// Define async bootstrap function
async function bootstrap() {
  try {
    // Initialize MSAL instance
    await msalInstance.initialize();
    console.log('MSAL initialized successfully');

    // Create Vue app instance

    // Register plugins
    registerPlugins(app);
    requestInterceptorUtils();
    responseInterceptorUtils();

    // Mount the app
    app.mount('#app');
  } catch (error) {
    console.error('MSAL initialization failed', error);
    // Handle initialization error (e.g., show error message)
  }
}

// Bootstrap the application
bootstrap();
