import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const ReviewButton = ({review, handleClick}) => {
  return <button onClick={handleClick}>{review}</button>;
};

const ReviewData = ({review, counter}) => {
  return <p>{review} {counter}</p>
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return ( 
  <>
    <h1>Give feedback</h1>
    <br/>
    <div>
      <ReviewButton review='good' handleClick={increaseGood}/>
      <ReviewButton review='neutral' handleClick={increaseNeutral}/>
      <ReviewButton review='bad' handleClick={increaseBad}/>
    </div>
    <br/>
    <h2>Statistics</h2>
    <br/>
    <ReviewData review={'good'} counter={good}/>
    <ReviewData review={'neutral'} counter={neutral}/>
    <ReviewData review={'bad'} counter={bad}/>
  </>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById('root'));
