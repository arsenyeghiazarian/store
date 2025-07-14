import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import '@/assets/main.css';

const vuetify = createVuetify({
  components,
  directives,
  theme: { defaultTheme: 'light' },
  icons: { defaultSet: 'mdi', aliases, sets: { mdi } },
});

export default vuetify;
