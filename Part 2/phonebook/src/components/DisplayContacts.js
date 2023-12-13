export const ContactsDisplay = ({ filterName, persons }) => {
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
      <h3>Contacts</h3>
      {filterPersons().map((person) => (
        <p key={person.name}>
          {person.name}, {person.number}
        </p>
      ))}
    </div>
  );
};
