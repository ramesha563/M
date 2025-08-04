import React, { useState } from "react";
import axios from "axios";
import "./Contact.css";
import { FaEnvelope, FaUser, FaComment } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5050/api/contact", formData);
      toast.success("Your message has been sent!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="contact-container">
      {/* <h2>Contact Us */}

         <img src="/help.gif" alt="contact Animation" className="help-gif" />
      {/* </h2> */}
      <form className="contact-form" onSubmit={handleSubmit}>


        
        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FaComment className="icon" />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>

      {/* Toast container for showing messages */}
      <ToastContainer position="top-center" autoClose={2500} />
    </div>
  );
};

export default Contact;
