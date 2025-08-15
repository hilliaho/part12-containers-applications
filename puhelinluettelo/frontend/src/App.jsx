import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import FilterForm from './components/FilterForm';
import AddNumberForm from './components/AddNumberForm';
import personService from './services/persons';
import Notification from './components/Notification';
import ErrorMessage from './components/ErrorMessage';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const resetForm = () => {
    setNewName('');
    setNewNumber('');
  };

  const updateNumber = (id) => {
    const updatedPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .update(id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== id ? person : returnedPerson
          )
        );
        resetForm();
        setNotification(`Updated ${updatedPerson.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch((error) => {
        setErrorMessage(
          'Failed to update number'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      });
  };

  const addName = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(
      (person) => person.name === newName
    );

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updateNumber(existingPerson.id);
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          resetForm();
          setNotification(`Added ${newPerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
        .catch(error => {
          console.log(error.response?.data?.error || "Failed to add number")
          setErrorMessage(
            error.response?.data?.error || "Failed to add number"
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        });
    }
  };

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (personToDelete && window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setNotification(`Deleted ${personToDelete.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ErrorMessage message={errorMessage} />
      <Notification message={notification} />
      <FilterForm
        searchFilter={searchFilter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add New Number</h2>
      <AddNumberForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;