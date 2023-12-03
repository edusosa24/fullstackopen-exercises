import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const Anecdotes = ({ anecdote, votes }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>Has {votes} votes</p>
    </div>
  );
};

const Buttons = ({ handleClickVote, handleClickRandom }) => {
  return (
    <div>
      <button onClick={handleClickVote}>Vote</button>
      <button onClick={handleClickRandom}>Next anecdote</button>
    </div>
  );
};

const TopAnecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>Most voted anecdote</h2>
      <p>{anecdote}</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [topAnecdote, setTopAnecdote] = useState(anecdotes[0]);

  const selectRandomAnecdote = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const addVote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
    updateTopAnecdote(copy);
  };

  const updateTopAnecdote = (votes) => {
    const auxMax = Math.max(...votes);
    const auxPosition = votes.indexOf(auxMax);

    setTopAnecdote(anecdotes[auxPosition]);
  };

  return (
    <>
      <Anecdotes anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Buttons
        handleClickRandom={selectRandomAnecdote}
        handleClickVote={addVote}
      />
      <br />
      <TopAnecdote anecdote={topAnecdote} />
    </>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById('root'));
