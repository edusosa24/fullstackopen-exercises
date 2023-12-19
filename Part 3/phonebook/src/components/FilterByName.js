export const FilterByName = ({ filterName, setFilterName }) => {
  const handleFilterNameChange = (event) => {
    event.preventDefault();
    setFilterName(event.target.value);
  };

  return (
    <div>
      Filter by name containing:{' '}
      <input value={filterName} onChange={handleFilterNameChange} />
    </div>
  );
};
