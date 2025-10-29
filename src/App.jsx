import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import Agent from './components/Agent'
import SignUp from './components/pages/SignUp'; 
import Itinerary from './components/pages/Itinerary';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/services' element={<Services />} />
        <Route path='/products' element={<Products />} />
         <Route path='/contact-us' element={<SignUp />} />
        <Route path='/travbud' element={<Agent apiKey={import.meta.env.VITE_PUBLIC_API_KEY} assistantId={import.meta.env.VITE_ASSISTANT_ID} />} />
        <Route path = '/view-itinerary' element = {<Itinerary/>}/>
      </Routes>
    </Router>
  );
}

export default App;
