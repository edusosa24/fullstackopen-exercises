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
  const [successMessage, setSuccessMessage] = useState('');

  const success = {
    padding: 5,
    marging: 5,
    color: 'green',
    border: '2px solid green',
    backgroundColor: 'lightgrey',
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    display: 'block',
  };

  useEffect(() => {
    services.getPersons().then((response) => {
      setPersons(response);
    });
  }, []);

  useEffect(() => {
    if (successMessage === '') {
    } else {
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  }, [successMessage]);

  return (
    <>
      <h2>Phonebook</h2>
      <FilterByName filterName={filterName} setFilterName={setFilterName} />
      <div style={successMessage === '' ? { display: 'none' } : success}>
        {successMessage}
      </div>
      <AddContact
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        persons={persons}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage}
      />
      <ContactsDisplay
        filterName={filterName}
        persons={persons}
        setPersons={setPersons}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
