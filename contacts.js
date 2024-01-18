const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");
console.log(contactsPath, "contacts path here");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts:", error);
    return;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || "Contact not found";
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    return "Error occurred while fetching contact";
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return "There is no contact with this ID";
    }
    const result = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.error("Error deleting contact by ID:", error);
    return;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const NewContact = {
      id: Math.random() * (10000 - 1) + 1,
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(NewContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return NewContact;
  } catch (error) {
    console.error("Error adding contact:", error);
    return;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
