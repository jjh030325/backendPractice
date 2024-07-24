const express = require("express");
const router = express.Router();
const { 
    getAllContacts, 
    CreateContacts, 
    getContact, 
    updateContact, 
    deleteContact,
    adddContactForm
} = require("../controllers/contactController");

router.route("/")
.get(getAllContacts)

router.route("/add")
.get(adddContactForm)
.post(CreateContacts);

router.route("/:id")
.get(getContact)
.put(updateContact)
.delete(deleteContact);

module.exports = router;