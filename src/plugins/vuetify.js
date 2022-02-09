import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#206CFF',
        secondary: '#00A88A',
        accent: '#8c9eff',
        error: '#EB5757',
        bg: '#F2F5F7',
        'semi-fade': '#6F7287',
        'mid-grey': '#6F7287'
      },
    },
  },
});
