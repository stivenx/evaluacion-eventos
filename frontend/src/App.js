import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";
import './App.css';

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetail from "./pages/eventDetail";
import Events from "./pages/events";
import EventCreate from './pages/eventCreate';
import EventEdit from './pages/eventEdit';



//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/create" element={<EventCreate />} />
        <Route path="/event/edit/:id" element={<EventEdit />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
