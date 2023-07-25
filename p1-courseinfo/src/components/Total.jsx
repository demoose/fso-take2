const Total = ({ parts }) => {
  const initialVal = 0;
  const sumWithInitial = parts.reduce((acc, obj) => {
    return acc + obj.exercises;
  }, initialVal);

  return (
    <>
      <p>Number of exercises: {sumWithInitial}</p>
    </>
  );
};

export default Total;
