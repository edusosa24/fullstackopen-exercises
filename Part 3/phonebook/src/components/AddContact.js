import services from '../services/services';

export const AddContact = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
  setSuccessMessage,
}) => {
  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const handleNewPerson = (event) => {
    event.preventDefault();
    const personsExist = persons.findIndex((person) => person.name === newName);
    const personId =
      personsExist === -1 ? persons.slice(-1).id : persons[personsExist].id;
    const person = {
      name: newName,
      number: newNumber,
      id: personsExist === -1 ? persons.slice(-1).id : personId,
    };
    if (personsExist < 0) {
      services
        .postPerson(person)
        .then((response) => {
          setSuccessMessage(`${person.name} added to contacts`);
          setPersons(persons.concat(response));
          setNewNumber('');
          setNewName('');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (
        confirm(
          `${newName} is already on the phonebook. Do you want to replace its number?`
        )
      ) {
        services
          .putPerson(person)
          .then(() => {
            const updatePersons = persons.map((person) => {
              if (person.name === newName) {
                person.number = newNumber;
              }
              return person;
            });
            setSuccessMessage(`${person.name} number updated`);
            setPersons(updatePersons);
            setNewNumber('');
            setNewName('');
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
