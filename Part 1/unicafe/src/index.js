import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const ReviewStatistics = (props) => {
  return (
    <div>
      <ul>
        <li>Good: {props.good}</li>
        <li>Neutral: {props.neutral}</li>
        <li>Bad: {props.bad}</li>
        <li>All: {props.all}</li>
        <li>Average: {props.average}</li>
        <li>Positive: {props.positive}%</li>
      </ul>
    </div>
  );
};

const ReviewButton = ({ review, handleClick }) => {
  return <button onClick={handleClick}>{review}</button>;
};

const ReviewData = ({ review, counter }) => {
  return (
    <p>
      {review} {counter}
    </p>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0.0);
  const [positive, setPositive] = useState(0.0);

  const updateAverage = (good, bad, all) => {
    setAverage((good - bad) / all);
  };

  const updatePositive = (good, all) => {
    setPositive((good * 100) / all);
  };

  const increaseGood = () => {
    const tempGood = good + 1;
    const tempAll = all + 1;
    setGood(tempGood);
    setAll(tempAll);
    updateAverage(tempGood, bad, tempAll);
    updatePositive(tempGood, tempAll);
  };

  const increaseNeutral = () => {
    const tempAll = all + 1;
    setNeutral(neutral + 1);
    setAll(tempAll);
    updateAverage(good, bad, tempAll);
    updatePositive(good, tempAll);
  };

  const increaseBad = () => {
    const tempBad = bad + 1;
    const tempAll = all + 1;
    setBad(tempBad);
    setAll(tempAll);
    updateAverage(good, tempBad, tempAll);
    updatePositive(good, tempAll);
  };

  return (
    <>
      <h1>Give feedback</h1>
      <br />
      <div>
        <ReviewButton review="good" handleClick={increaseGood} />
        <ReviewButton review="neutral" handleClick={increaseNeutral} />
        <ReviewButton review="bad" handleClick={increaseBad} />
      </div>
      <br />
      <h2>Statistics</h2>
      <br />
      <ReviewStatistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById('root'));
