import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    event.preventDefault();
    setFilterName(event.target.value);
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

  const filterPersons = () => {
    const filteredPersons = [];
    if (filterName === '') {
      return persons;
    } else {
      persons.forEach((person) => {
        if (person.name.toLowerCase().includes(filterName.toLowerCase())) {
          filteredPersons.push(person);
        }
      });
    }
    return filteredPersons;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Filter shown with:{' '}
          <input value={filterName} onChange={handleFilterChange} />
          <br />
          <h3>Add New</h3>
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
      <h2>Numbers</h2>
      <div>
        debug:{' '}
        {filterPersons().map((person) => (
          <p key={person.name}>
            {person.name}, {person.number}
          </p>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
