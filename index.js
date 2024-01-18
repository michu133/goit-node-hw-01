const { Command } = require("commander");
const contacts = require("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      console.log(contactsList);
      break;

    case "get":
      const contactById = await contacts.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(`Successfully added: ${JSON.stringify(newContact)}`);
      break;

    case "remove":
      const deletedContact = await contacts.removeContact(id);
      console.log(`Successfully deleted: ${JSON.stringify(deletedContact)}`);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
