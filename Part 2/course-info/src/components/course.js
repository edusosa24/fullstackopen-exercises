export const Course = ({ courses }) => {
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
