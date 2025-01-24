import React from "react";
import { Link } from "react-router-dom";


const EventCard = ({ event }) => {
    const fecha = new Date(event.date);
    const fechaFormateada = fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    return (
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 ml-4">
        <div className="text-center">
          <Link to={`/event/${event._id}`}>
            <h1 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white mt-2">{event.title}</h1>
          </Link>
          <div className="px-5 pb-5">
            <p className="text-sm font-bold text-black dark:text-white">{event.description}</p>
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold text-black dark:text-white">Fecha: {fechaFormateada}</span>
              <span className="text-sm font-bold text-black dark:text-white">Hora de inicio: {event.time.start}</span>
              <span className="text-sm font-bold text-black dark:text-white">Hora de fin: {event.time.end}</span>
            </div>
          </div>
          <div className="flex items-center justify-center mb-4">
            <Link to={`/event/${event._id}`} className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-1.5 text-center">
              Ver evento
            </Link>
          </div>
        </div>
      </div>
    );
  };

export default EventCard;