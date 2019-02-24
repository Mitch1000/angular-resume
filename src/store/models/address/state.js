/**
 * models/address/state
 *
 * The initial state and tree of the address Vuex module.
 */

export default {
  // The current address:
  firstName: '',
  lastName: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  phoneNumber: '',

  // Avaiable countries:
  countries: [
    {
      name: 'Canada',
      value: 'ca',
    },
    {
      name: 'United States',
      value: 'us',
    },
  ],

  // States/provinces, fetched based on current country:
  states: [],

  // A loading state that is toggled during the fetching of states:
  isLoading: false,
};
