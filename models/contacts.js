const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contactsArray = await listContacts();
  const contact = contactsArray.find((el) => el.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contactsArray = await listContacts();
  const contactIndex = contactsArray.findIndex((el) => el.id === contactId);
  if (contactIndex === -1) return null;
  const [spliceContacts] = contactsArray.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  return spliceContacts;
};

const addContact = async ({ name, email, phone }) => {
  const contactsArray = await listContacts();
  const newContact = { id: nanoid(), name, email, phone: phone.toString() };
  contactsArray.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsArray = await listContacts();
  const contactIndex = contactsArray.findIndex((el) => el.id === contactId);
  if (contactIndex === -1) return null;
  contactsArray[contactIndex] = { ...contactsArray[contactIndex], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  return contactsArray[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}; 
