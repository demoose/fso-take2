function Persons({peopleToShow, handleDelete}) {
  return (
    <div>
      {peopleToShow.map((person) => (
        <div key={person.id}>
        <p >
          {person.name} / {person.number} 
        </p>
        <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default Persons;
