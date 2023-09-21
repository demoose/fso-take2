const Note = ({ note, toggleImportance }) => {

  const label = note.important ? 'unflag' : 'flag'

  return <li>{note.content}
  <button onClick={toggleImportance}>{label}</button></li>;
};

export default Note;
