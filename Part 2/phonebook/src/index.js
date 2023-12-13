import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
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

  const handleNewName = (event) => {
    event.preventDefault();
    const isValid = isNoDuplicate();
    if (isValid) {
      setPersons(persons.concat({ name: newName }));
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
        </div>
        <div>
          <button type="submit" onClick={handleNewName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        debug:{' '}
        {persons.map((person) => (
          <p key={person.name}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
