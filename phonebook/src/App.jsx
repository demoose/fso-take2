import { useEffect, useState } from "react";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([
    
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
      alert(`${newName} is already in the phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
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
      <Persons peopleToShow={peopleToShow} />
    </div>
  );
};

export default App;
