const Contact = require("../models/contactModel");

// Create a new contact message
exports.createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ success: true, message: "Message received!" });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// Get all contact messages (optional for admin)
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
};
