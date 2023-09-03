const Contact = require('./models/contacts.js');

async function updateStatusContact(contactId, body) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      { new: true }
    );

    if (!updatedContact) {
      return null;
    }

    return updatedContact;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  // другие функции
  updateStatusContact,
};
