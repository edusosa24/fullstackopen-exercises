const initialFilter = '';

export const updateFilter = (filter) => {
  return {
    type: 'FILTER',
    payload: {
      filter,
    },
  };
};

const reducer = (state = initialFilter, action) => {
  switch (action.type) {
    case 'FILTER':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
