import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '40-20-565620' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleNewPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        debug:{' '}
        {persons.map((person) => (
          <p key={person.name}>
            {person.name}, {person.number}
          </p>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
