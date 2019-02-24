/**
 * models/address/getters
 *
 * The getter methods of the address Vuex module.
 */

export default {
  /**
   * getProperty - Returns the value of `key` from the current address state.
   *
   * @param   {String} key  The key of the property to be returned
   * @return                The value of state[key]
   */
  getProperty: state => key => state[key],

  /**
   * getFormatedAddressForServer - Returns the address object with params formated to match the rails model.
   *
   * @return - The formated address 
   */
  getFormatedAddressForServer: state => () => {
    return {
      first_name: state.firstName,
      last_name: state.lastName,
      line_1: state.line1,
      line_2: state.line2,
      city: state.city,
      state: state.state,
      zip: state.zip,
      country: state.country,
      phone_number: state.phoneNumber,
    };
  },
};
