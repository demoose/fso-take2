function PersonForm({
  addPerson,
  newName,
  newNumber,
  handleName,
  handleNumber,
}) {
  return (
    <div>
      <h3>Add to phonebook</h3>
      <form>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonForm;
