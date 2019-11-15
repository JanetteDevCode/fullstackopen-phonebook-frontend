import React from 'react';

const Person = ({ person, handleDeletePerson }) => {
  return (
    <div>
      {person.name} {person.phone} <button onClick={handleDeletePerson(person)}>delete</button>
    </div>
  );
};

export default Person;