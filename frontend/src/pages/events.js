import React, { useEffect, useState } from "react";
import api from "../configApi/api";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDelete = async (eventId) => {
    try {
      await api.delete(`/events/delete/${eventId}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      alert("El evento ha sido eliminado con éxito.");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFilteredEvents = async () => {
    if (startDate && endDate) {
      try {
        const response = await api.get(`/events/date/${startDate}/${endDate}`);
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Por favor, seleccione ambas fechas para aplicar el filtro.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md">
      <div className="flex justify-between items-center px-4 py-2 bg-primary-100 dark:bg-primary-800">
        <h2 className="text-xl font-semibold text-primary-900 dark:text-white">Events</h2>

        <div className="flex items-center space-x-2">
          <label className="block text-sm font-medium text-gray-900 dark:text-white">Fecha de inicio:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-gray-50 border text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="block text-sm font-medium text-gray-900 dark:text-white">Fecha de fin:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-gray-50 border text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            className="px-4 py-2 bg-primary-700 text-white hover:bg-primary-600"
            onClick={fetchFilteredEvents}
          >
            Aplicar filtro
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-900 hover:bg-gray-400"
            onClick={() => {
              setStartDate("");
              setEndDate("");
              fetchEvents();
            }}
          >
            Limpiar filtro
          </button>
        </div>

        <a href="/event/create" className="px-4 py-2 bg-primary-700 text-white hover:bg-primary-600">
          Add event
        </a>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Time Start</th>
            <th className="px-6 py-3">Time End</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Location</th>
            <th className="px-6 py-3">Edit</th>
            <th className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr>
              <td colSpan="8" className="px-6 py-4 text-center">
                No hay eventos en la fecha del {startDate || "inicio"} al {endDate || "fin"}.
              </td>
            </tr>
          ) : (
            events.map((event) => (
              <tr
                key={event._id}
                className="odd:bg-white even:bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{event.title}</td>
                <td className="px-6 py-4">
                  {new Date(event.date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">{event.time.start}</td>
                <td className="px-6 py-4">{event.time.end}</td>
                <td className="px-6 py-4">{event.description}</td>
                <td className="px-6 py-4">{event.location}</td>
                <td className="px-6 py-4">
                  <a href={`/event/edit/${event._id}`} className="font-medium text-primary-500 hover:underline">
                    Edit
                  </a>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="font-medium text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Events;

