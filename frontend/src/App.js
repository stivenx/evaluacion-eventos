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
import SearchEvents from './pages/searchEvents';
import Tareas from './pages/tareas';
import  TareasCreate from "./pages/tareasCreate";
import TareasEdit from "./pages/tareasEdit"
import Users from './pages/users';
import TareasUser from './pages/tareasUser';


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
        <Route path="/search" element={<SearchEvents />} />
        <Route path="/tareas" element={<Tareas />} />
        <Route path="/tareas/create" element={<TareasCreate />} />
        <Route path="/tareas/edit/:id" element={<TareasEdit />} />
        <Route path="/users" element={<Users />} />
        <Route path="/tareas/user/:id" element={<TareasUser />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
