import services from '../services/services';

export const ContactsDisplay = ({ filterName, persons, setPersons }) => {
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

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this?')) {
      services.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <div>
      <h3>Contacts</h3>
      {filterPersons().map((person) => (
        <p key={person.id}>
          {person.name}, {person.number}{' '}
          <button onClick={() => handleDelete(person.id)}> Delete </button>
        </p>
      ))}
    </div>
  );
};
