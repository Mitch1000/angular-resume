/**
 * CreditCardPurchase Store
 *
 * Compiles all purchase modules into one vuex store
 */
import address from '../../models/address';
import purchaseOrder from '../../models/purchaseOrder';
import creditCard from '../../models/creditCard';
import wizardConfig from '../../models/multipleStepForm';

const modules = {
  address,
  purchaseOrder,
  creditCard,
  wizardConfig,
};

export default {
  strict: process.env.NODE_ENV !== 'production',
  modules,
};
