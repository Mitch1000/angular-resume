/**
 * The initial state of the purchase order.
 * TODO: This information will have to be fetched from a catalogue api in the future
 */
export default {
  isAllItemsPurchased: false,
  currentSelection: 'item1',
  sectionForPurchaseIds: [1],
  sectionsOrderCreatePath: '',
  isLoading: false,
  purchaseOptions: [
    {
      value: 'item1',
      price: 300,
      name: 'A Fake Item',
    },
    {
      value: 'item2',
      price: 400,
      name: 'A Fancy Item',
    },
    {
      value: 'item3',
      price: 500,
      name: 'A Fancier Item',
    },
  ],
  hasError: false,
  error: {},
};
