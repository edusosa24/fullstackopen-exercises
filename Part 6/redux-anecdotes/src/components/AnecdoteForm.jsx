import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import {
  createNotification,
  resetNotification,
} from '../reducers/notificationReducer';
import services from '../services/services';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    const anecdote = await services.postOne({
      content,
      votes: 0,
    });

    dispatch({ type: createAnecdote, payload: anecdote });
    dispatch({ type: createNotification, payload: content });

    setTimeout(() => {
      dispatch({ type: resetNotification, payload: '' });
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
