
import React, {useState} from "react";
import api from "../configApi/api";
import { useNavigate } from "react-router-dom";
import {useAuthRedirect2} from "../hooks/useAuthRedirect2";


const EventCreate = () => {
   
   useAuthRedirect2(); // Llamada al hook useAuthRedirect();

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState({ start: '', end: '' });
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Validar formato de tiempo
        const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM|am|pm)$/;
        if (!timeRegex.test(time.start) || !timeRegex.test(time.end)) {
          alert('El formato de la hora no es válido. Usa el formato hh:mm AM/PM.');
          return;
        }
  
        const response = await api.post('/events/', {
          title,
          date,
          time: { start: time.start, end: time.end },
          description,
          location,
        });
  
        console.log(response.data);
        alert('Evento creado con éxito.');
        navigate('/events');
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message || 'Error al crear el evento');
        } else {
          console.error('Detalles del error:', error);
          alert('Hubo un error al crear el evento.');
        }
      }
    };
  
    return (
      <div className="h-screen flex flex-col justify-center bg-white dark:bg-gray-900">
        <h1 className="text-4xl font-semibold text-primary-900 dark:text-white text-center mb-8">
          Crear un nuevo evento
        </h1>
        <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Date:
            </label>
            <input
              type="date"
              id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="start" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Time Start:
            </label>
            <input
              type="text"
              id="start"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={time.start}
              onChange={(e) => setTime({ ...time, start: e.target.value })}
              placeholder="hh:mm AM/PM"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="end" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Time End:
            </label>
            <input
              type="text"
              id="end"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={time.end}
              onChange={(e) => setTime({ ...time, end: e.target.value })}
              placeholder="hh:mm AM/PM"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description:
            </label>
            <input
              type="text"
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Location:
            </label>
            <input
              type="text"
              id="location"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Crear
          </button>
        </form>
      </div>
    );
  };


export default EventCreate;
  