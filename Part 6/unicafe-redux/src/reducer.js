const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const newState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'GOOD':
      newState.good = state.good + 1;
      newState.ok = state.ok;
      newState.bad = state.bad;
      return newState;
    case 'OK':
      newState.good = state.good;
      newState.ok = state.ok + 1;
      newState.bad = state.bad;
      return newState;
    case 'BAD':
      newState.good = state.good;
      newState.ok = state.ok;
      newState.bad = state.bad + 1;
      return newState;
    case 'ZERO':
      newState.good = 0;
      newState.bad = 0;
      newState.ok = 0;
      return newState;
    default:
      return state;
  }
};

export default counterReducer;
