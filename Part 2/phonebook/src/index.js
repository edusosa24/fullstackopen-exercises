import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { AddContact } from './components/AddContact';
import { FilterByName } from './components/FilterByName';
import { ContactsDisplay } from './components/DisplayContacts';

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

  return (
    <>
      <h2>Phonebook</h2>
      <FilterByName filterName={filterName} setFilterName={setFilterName} />
      <AddContact
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
      />
      <ContactsDisplay filterName={filterName} persons={persons} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
