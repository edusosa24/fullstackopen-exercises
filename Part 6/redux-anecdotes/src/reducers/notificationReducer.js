import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notification: '',
};

const notificationSlice = createSlice({
  name: 'notificaion',
  initialState,
  reducers: {
    createNotification(state, action) {
      state.notification = `Anecdote "${action.payload}" successfully created`;
    },
    upVoteNotification(state, action) {
      state.notification = `Up voted "${action.payload}" anecdote`;
    },
    resetNotification(state, action) {
      state.notification = action.payload;
    },
  },
});

export const { createNotification, upVoteNotification, resetNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
