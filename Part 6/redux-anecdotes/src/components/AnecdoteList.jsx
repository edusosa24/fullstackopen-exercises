import { useSelector, useDispatch } from 'react-redux';
import { upVote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === '') {
      return state.anecdotes;
    }

    const fil = Object.values(state.filter)[0];

    const filtered = state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(fil)
    );

    return filtered;
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(upVote(id));
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
