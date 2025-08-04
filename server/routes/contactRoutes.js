const express = require("express");
const router = express.Router();
const { createContact, getContacts } = require("../controllers/contactController");

// Public route for user to send message
router.post("/", createContact);

// Admin route to get all messages (you can protect this route if needed)
router.get("/", getContacts);

module.exports = router;
