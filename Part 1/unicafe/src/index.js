import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const ReviewStatistics = (props) => {
  if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <StatisticsLine text={'Good'} value={props.good} />
        <StatisticsLine text={'Neutral'} value={props.neutral} />
        <StatisticsLine text={'Bad'} value={props.bad} />
        <StatisticsLine text={'All'} value={props.all} />
        <StatisticsLine text={'Average'} value={props.average} />
        <StatisticsLine text={'Positive'} value={props.positive + '%'} />
      </div>
    );
  }
};

const ReviewButtons = (props) => {
  return (
    <div>
      <Button handleClick={props.handleClickGood} review={'Good'} />
      <Button handleClick={props.handleClickNeutral} review={'Neutral'} />
      <Button handleClick={props.handleClickBad} review={'Bad'} />
    </div>
  );
};

const Button = ({ handleClick, review }) => {
  return <button onClick={handleClick}>{review}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <p>
      {text}: {value}
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
      <ReviewButtons
        handleClickGood={increaseGood}
        handleClickNeutral={increaseNeutral}
        handleClickBad={increaseBad}
      />
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
