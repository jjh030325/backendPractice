const asyncHandler = require("express-async-handler");

// Get all contacts
// GET /contacts

const getAllContacts = asyncHandler(async (req, res) => {
    res.send("Contacts Page");
});

const CreateContacts = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.send("필수 값이 입력되지 않았습니다.");
    }
    res.send("Create Contacts");
})

const getContact = asyncHandler(async (req, res) => {
    res.send(`View Contact for ID : ${req.params.id}`);
})

const updateContact = asyncHandler(async (req, res) => {
    res.send(`Update Contact for ID : ${req.params.id}`);
})

const deleteContact = asyncHandler(async (req, res) => {
    res.send(`Delete Contact for ID : ${req.params.id}`);
})

module.exports = { 
    getAllContacts, 
    CreateContacts,
    getContact,
    updateContact,
    deleteContact
};