import React, { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Notification, { NotificationType } from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setNewFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    getAllPersons();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayNotification = (type, message) => {
    setNotification({
      type: type,
      message: message
    });
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setNotification(null);
      }, 5000)
    );
  };

  const getAllPersons = () => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((error) => {
        console.log('get all persons error:', error);
        displayNotification(
          NotificationType.ERROR,
          'Could not get persons from the server.'
        );
      });
  };

  const personExists = (name) => {
    return persons.find((person) => {
      return person.name.toLowerCase() === name.toLowerCase();
    });
  };

  const addPerson = (personToAdd) => {
    personService
      .createPerson(personToAdd)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        displayNotification(
          NotificationType.SUCCESS, 
          `${returnedPerson.name} was successfully added to the server.`
        );
      })
      .catch((error) => {
        console.log('add person error:', error);
        displayNotification(
          NotificationType.ERROR,
          `${personToAdd.name} could not be added to the server.`
        )
      });
  }
  
  const updatePerson = (personToUpdate) => {
    personService
      .updatePerson(personToUpdate)
      .then((returnedPerson) => {
        setPersons(persons.map((person) => {
          return personToUpdate.id !== person.id ? person : returnedPerson;
        }));
        displayNotification(
          NotificationType.SUCCESS,
          `${returnedPerson.name} was successfully updated on the server.`
        );
      })
      .catch((error) => {
        console.log('update person error:', error);
        setPersons(persons.filter((person) => {
          return personToUpdate.id !== person.id;
        }));
        displayNotification(
          NotificationType.ERROR,
          `${personToUpdate.name} could not be updated since the person does not exist on the server.`
        );
      });
  };

  const deletePerson = (personToDelete) => {
    personService
      .deletePerson(personToDelete)
      .then((returnedPerson) => {
        setPersons(persons.filter((person) => {
          return personToDelete.id !== person.id;
        }));
        displayNotification(
          NotificationType.SUCCESS,
          `${personToDelete.name} was successfully deleted from the server.`
        );
      })
      .catch((error) => {
        console.log('delete person error:', error);
        setPersons(persons.filter((person) => {
          return personToDelete.id !== person.id;
        }));
        displayNotification(
          NotificationType.ERROR,
          `${personToDelete.name} was already deleted from the server.`
        );
      });
  };

  const handleAddPerson = (event) => {
    event.preventDefault();
    const name = newName.trim();
    const phone = newPhone.trim();
    const existingPerson = personExists(name);
    if (!name) {
      displayNotification(
        NotificationType.ERROR,
        'No name was given.'
      );
      return;
    }
    if (!phone) {
      displayNotification(
        NotificationType.ERROR,
        'No phone number was given.'
      );
      return;
    }
    if (existingPerson && phone === existingPerson.number) {
      displayNotification(
        NotificationType.ERROR,
        `${name} is already in the phonebook.`
      );
      setNewName('');
      return;
    } else if (existingPerson) {
      const confirmUpdate = window.confirm(`${existingPerson.name} already exists. Replace phone number?`);
      if (confirmUpdate) {
        const editedPerson = {
          ...existingPerson,
          number: phone
        };
        updatePerson(editedPerson);
      } else {
        displayNotification(
          NotificationType.INFO,
          'No update was made.'
        );
      }
    } else {
      const newPerson = {
        name: name,
        number: phone
      };
      addPerson(newPerson);
    }
    setNewName('');
    setNewPhone('');
  };

  const handleDeletePerson = (person) => {
    return (() => {
      const confirmDelete = window.confirm(`Delete ${person.name}?`);
      if (confirmDelete) {
        const removablePerson = {
          ...person
        };
        deletePerson(removablePerson);
      } else {
        displayNotification(
          NotificationType.INFO,
          'No person was deleted.'
        );
      }
    });
  };

  const changeName = (event) => {
    setNewName(event.target.value);
  };

  const changePhone = (event) => {
    setNewPhone(event.target.value);
  };

  const changeFilter = (event) => {
    setNewFilter(event.target.value);
  };
  
  return (
    <div>
        <h2>Phonebook</h2>
        <Notification notification={notification} />
        <Filter filter={filter} changeFilter={changeFilter} />
        <h3>add new contact</h3>
        <PersonForm
          handleAddPerson={handleAddPerson}
          newName={newName}
          changeName={changeName}
          newPhone={newPhone}
          changePhone={changePhone} />
        <h2>Numbers</h2>
        <Persons 
          filter={filter} 
          persons={persons} 
          handleDeletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
