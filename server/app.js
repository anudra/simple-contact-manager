const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;
const CONTACTS_FILE = path.join(__dirname, 'contacts.json');

app.use(cors());
app.use(express.json());

const readContacts = () => {
  const data = fs.readFileSync(CONTACTS_FILE);
  return JSON.parse(data);
};

const writeContacts = (contacts) => {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
};

app.get('/contacts', (req, res) => {
  const contacts = readContacts();
  res.json(contacts);
});

app.post('/contacts', (req, res) => {
  const contacts = readContacts();
  const newContact = { id: Date.now(), ...req.body };
  contacts.push(newContact);
  writeContacts(contacts);
  res.json(newContact);
});

app.put('/contacts/:id', (req, res) => {
  const contacts = readContacts();
  const updatedContact = req.body;
  const index = contacts.findIndex((c) => c.id === parseInt(req.params.id));
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...updatedContact };
    writeContacts(contacts);
    res.json(contacts[index]);
  } else {
    res.status(404).send('Contact not found');
  }
});

app.delete('/contacts/:id', (req, res) => {
  const contacts = readContacts();
  const filteredContacts = contacts.filter((c) => c.id !== parseInt(req.params.id));
  writeContacts(filteredContacts);
  res.sendStatus(204);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});