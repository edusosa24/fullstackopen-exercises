import { createSlice } from '@reduxjs/toolkit';
import services from '../services/services';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    updateVotes(state, action) {
      return state.map((anecdote) => {
        return anecdote.id !== action.payload.id ? anecdote : action.payload;
      });
    },
    setAnecdotes(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { appendAnecdote, updateVotes, setAnecdotes } =
  anecdotesSlice.actions;

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = {
      content,
      votes: 0,
    };
    const data = await services.postOne(anecdote);
    dispatch(appendAnecdote(data));
  };
};

export const upVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const data = await services.putOne(updatedAnecdote);
    dispatch(updateVotes(data));
  };
};

export default anecdotesSlice.reducer;
