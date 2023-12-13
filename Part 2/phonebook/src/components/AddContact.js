export const AddContact = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
}) => {
  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const isNoDuplicate = () => {
    let isValid = true;
    persons.forEach((person) => {
      if (person.name === newName && isValid) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleNewPerson = (event) => {
    event.preventDefault();
    const isValid = isNoDuplicate();
    if (isValid) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewNumber('');
      setNewName('');
    } else {
      alert(`${newName} is already on the phonebook.`);
    }
  };

  return (
    <form>
      <h3>Add New Contact</h3>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
        <br />
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={handleNewPerson}>
          Add
        </button>
      </div>
    </form>
  );
};
