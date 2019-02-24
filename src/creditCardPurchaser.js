import Vue from 'vue';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';

import CreditCardPurchase from './CreditCardPurchase/app.vue';
import CreditCardPurchaseStore from './store/apps/CreditCardPurchase';

Vue.use(Vuex);
Vue.use(VeeValidate);

const store = new Vuex.Store(CreditCardPurchaseStore);

new Vue({ // eslint-disable-line no-new
  el: '#credit-card-purchase-app',
  store,

  render(createElement) {
    return createElement(CreditCardPurchase);
  },
});
