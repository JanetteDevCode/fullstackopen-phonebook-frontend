import React from 'react';

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleAddPerson}>
      <div>
        name: <input placeholder='Jane Doe' value={props.newName} onChange={props.changeName} />
      </div>
      <div>
        number: <input placeholder='555-867-5309' value={props.newPhone} onChange={props.changePhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;