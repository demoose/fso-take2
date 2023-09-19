function Persons({peopleToShow}) {
  return (
    <div>
      {peopleToShow.map((person) => (
        <p key={person.id}>
          {person.name} / {person.number}
        </p>
      ))}
    </div>
  );
}

export default Persons;