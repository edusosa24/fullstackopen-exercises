import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import { AddContact } from './components/AddContact';
import { FilterByName } from './components/FilterByName';
import { ContactsDisplay } from './components/DisplayContacts';
import services from './services/services';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    services.getPersons().then((response) => {
      setPersons(response);
    });
  }, []);

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
