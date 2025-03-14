import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Contact from './contact';

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async() => {
        const response = await axios.get('http://localhost:5000/contacts');
        setContacts(response.data)
        console.log(contacts);
      };
    
    fetchContacts();
  }, [contacts]);

  return (
    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tr>
          <th>SI No.</th>
          <th>Name</th>
          <th>Contact No.</th>
          <th>Action</th>
          <th>Action</th>
        </tr>
        {contacts.map((contact,index) => (
          <Contact key={contact.id} index={index} contact={contact} />
        ))}
    </table>
  );
};

export default ContactList;