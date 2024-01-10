import { createSlice } from '@reduxjs/toolkit';

const updateVotes = (anecdote) => {
  return {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes + 1,
  };
};

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    upVote(state, action) {
      return state.map((anecdote) => {
        return anecdote.id !== action.payload.id
          ? anecdote
          : updateVotes(anecdote);
      });
    },
    setAnecdotes(state, action) {
      state = action.payload;
      return state;
    },
  },
});

export const { createAnecdote, upVote, setAnecdotes } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
