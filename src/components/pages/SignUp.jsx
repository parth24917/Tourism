import React from 'react';
import '../../App.css';
import ContactForm from './form.jsx';
import './Signup.css'

export default function SignUp() {
  return (
    <div className="signup-container">
      <div className="signup-heading">
        <h1>We'd love to hear from you!</h1>
      </div>
      <div className="signup-form">
        <ContactForm />
      </div>
    </div>
  );
}

