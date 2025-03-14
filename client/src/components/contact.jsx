import React, { useState } from 'react';
import axios from 'axios';

const Contact = ({index, contact }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);

  const handleUpd = async () => {
    const updatedCon = { name, phone };
    await axios.put(`http://localhost:5000/contacts/${contact.id}`, updatedCon);
    setEditMode(false);
  };

  const handleDel = async () => {
    await axios.delete(`http://localhost:5000/contacts/${contact.id}`);
  };

  return (
    <tr>
      <td>{index+1}</td>
      <td>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          contact.name
        )}
      </td>
      <td>
        {editMode ? (
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        ) : (
          contact.phone
        )}
      </td>
      <td>
        {editMode ? (
          <button onClick={handleUpd}>Save</button>
        ) : (
          <button onClick={() => setEditMode(true)}>Update</button>
        )}
      </td>
      <td>
        <button onClick={handleDel}>Delete</button>
      </td>
    </tr>
  );
};

export default Contact;