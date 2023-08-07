const express = require("express");
const router = express.Router();
const validateBody = require("../../middleware/validateBody");
const addSchema = require("../../schemas/contacts");
const ctrl = require("../../controlles/contacts");


router.get("/", ctrl.listContacts);
router.get("/:contactId", ctrl.getContactById);
router.post("/", validateBody(addSchema), ctrl.addContact);
router.delete("/:contactId", ctrl.removeContact);
router.put("/:contactId", validateBody(addSchema), ctrl.updateContact);
module.exports = router;
