// Styles
import '@mdi/font/css/materialdesignicons.css';
// import 'vuetify/styles';
import '@/assets/styles/scss/vuetifyConfig.scss';
import { createVuetify } from 'vuetify';
import { VDateInput } from 'vuetify/labs/VDateInput';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { takafoLightTheme } from './theme';

export default createVuetify({
  theme: {
    defaultTheme: 'takafoLightTheme',
    themes: {
      takafoLightTheme,
    },
  },
  defaults: {
    global: {
      ripple: false,
    },
    VSheet: {
      elevation: 4,
    },
  },
  components: {
    ...components,
    VDateInput,
  },

  directives,
});
