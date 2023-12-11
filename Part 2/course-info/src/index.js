import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total exercises={course.parts} />
          </div>
        );
      })}
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  console.log(props.parts);
  return (
    <div>
      {props.parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </div>
  );
};

const Total = (props) => {
  const total = props.exercises.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );
  return <p>Number of excercises {total}</p>;
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Course courses={courses} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
