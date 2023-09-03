const express = require('express');
const router = express.Router();
const validateBody = require('../../middleware/validateBody');
const addSchema = require('../../schemas/contacts');
const ctrl = require('../../controlles/contacts');


// ... предыдущие маршруты ...

router.patch('/:contactId/favorite', validateBody(addSchema), ctrl.updateFavoriteStatus);
router.patch('/:contactId/favorite', validateBody(addSchema), updateFavoriteStatus);

router.get("/", ctrl.listContacts);
router.get("/:contactId", ctrl.getContactById);
router.post("/", validateBody(addSchema), ctrl.addContact);
router.delete("/:contactId", ctrl.removeContact);
router.put("/:contactId", validateBody(addSchema), ctrl.updateContact);
module.exports = router;


// updatestatus
const { updateStatusContact } = require('../../models/contacts');

async function updateFavoriteStatus(req, res) {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    if (typeof favorite !== 'boolean') {
      return res.status(400).json({ message: 'missing field favorite' });
    }

    const updatedContact = await updateStatusContact(contactId, { favorite });

    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  // ... другие функции
  updateFavoriteStatus,
};
