import { useEffect, useState } from "react";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import axios from "axios";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([
    
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response)
    })
  }, [])

  const personNamesOnly = () => {
    return persons.map((person) => person.name.toLowerCase());
  };

  const checkDuplicate = (name) => {
    const names = personNamesOnly(persons);
    return names.includes(name.toLowerCase());
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (checkDuplicate(newName)) {
      if(window.confirm(`${newName} is already in the phonebook. Do you want to replace the old number with the new one?`)) {
        const person = persons.find((person) => person.name === newName)
        handleUpdate(person)
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then(response => setPersons(persons.concat(response)))
    }

    setNewName("");
    setNewNumber("");
  };

  const handleName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilterName(event.target.value);
  };

  const peopleToShow =
    filterName === ""
      ? persons
      : persons.filter((person) => person.name.includes(filterName));

  const handleDelete = (id) => {
    if(window.confirm(`Are you sure you want to delete ${persons.find((person) => person.id === id).name}?`)) {
      personService
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
    }
  }

  const handleUpdate = (person) => {
    const id = person.id
    const personObject = {...person, number: newNumber}
    personService
      .update(id, personObject)
      .then(response => {setPersons(persons.map(person => person.id !== id ? person : response))})
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilter={handleFilter} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
      />

      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
