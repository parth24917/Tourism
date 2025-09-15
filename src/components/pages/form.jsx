import React, { useState } from 'react';
import '../../App.css';
import './form.css';
import axios from 'axios';

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      message: message  
    };
  
    axios.post("http://localhost:4000/api/users/register", data)
      .then(() => {
        alert("We will contact you shortly.");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("User already exists!");
        } else {
          alert("Something went wrong. Please try again.");
        }
      });
  };
  
  return (
    <form className='contact-form'>
      <h2 className='contact-header'>Contact Us</h2>
      <label htmlFor='name'>Name:</label>
      <input type='text' id='name' value={name} onChange={e => setName(e.target.value)} />

      <label htmlFor='email'>Email:</label>
      <input type='email' id='email'  value={email} onChange={e => setEmail(e.target.value)} />

      <label htmlFor='message'>Message: </label>  
      <textarea id='message' value={message} onChange={e => setMessage(e.target.value)} /> 

      <button type='submit' onClick={(e) => handleSubmit(e)}>Send</button>
    </form>
  );
}
