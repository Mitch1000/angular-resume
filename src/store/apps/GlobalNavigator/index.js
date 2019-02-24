/**
 *  Global Navigator
 *
 * Compiles all the required modules for the Global Navigator app.
 */

import notifications from '../../models/notifications';

const modules = {
  notifications,
};

export default {
  strict: process.env.NODE_ENV !== 'production',
  modules,
};
