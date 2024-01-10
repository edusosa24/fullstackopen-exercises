import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notification: '',
};

const notificationSlice = createSlice({
  name: 'notificaion',
  initialState,
  reducers: {
    updateNotification(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { updateNotification } = notificationSlice.actions;

export const setNotification = (notification, time) => {
  return (dispatch) => {
    const timeout = time * 1000;

    dispatch(updateNotification(notification));

    setTimeout(() => {
      dispatch(updateNotification(''));
    }, timeout);
  };
};

export default notificationSlice.reducer;
