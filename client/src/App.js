import React from 'react';
import AddContact from './components/addContact';
import ContactList from './components/contactList';

const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>My Contact List - "SKY"</h1>
      <AddContact />
      <ContactList />
    </div>
  );
};

export default App;