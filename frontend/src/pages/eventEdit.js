import React, {useState, useEffect} from "react";
import api from "../configApi/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuthRedirect2 } from "../hooks/useAuthRedirect2";




const EventEdit = () => {
  useAuthRedirect2();
  
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState({ start: "", end: "" });
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        const eventData = response.data;

        // Asegurar que la fecha esté en formato ISO
        const formattedDate = new Date(eventData.date).toISOString().split("T")[0];

        setTitle(eventData.title);
        setDate(formattedDate);
        setTime({
          start: eventData.time.start,
          end: eventData.time.end,
        });
        setDescription(eventData.description);
        setLocation(eventData.location);
      } catch (error) {
        console.error("Error al cargar el evento:", error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM|am|pm)$/;
      if (!timeRegex.test(time.start) || !timeRegex.test(time.end)) {
        alert("El formato de la hora no es válido. Usa el formato hh:mm AM/PM.");
        return;
      }

      await api.patch(`/events/update/${id}`, {
        title,
        date,
        time : { start: time.start, end: time.end },
        description,
        location,
      });

      alert("Evento actualizado con éxito.");
      navigate("/events");
    } catch (error) {
      console.error("Error al actualizar el evento:", error);
      alert("Hubo un error al actualizar el evento.");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-semibold text-primary-900 dark:text-white text-center mb-8">
        Actualizar Evento
      </h1>
      <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Título:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Fecha:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="start" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Hora Inicio:
          </label>
          <input
            type="text"
            id="start"
            value={time.start}
            onChange={(e) => setTime({ ...time, start: e.target.value })}
            placeholder="hh:mm AM/PM"
            required
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="end" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Hora Fin:
          </label>
          <input
            type="text"
            id="end"
            value={time.end}
            onChange={(e) => setTime({ ...time, end: e.target.value })}
            placeholder="hh:mm AM/PM"
            required
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Descripción:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600"
          ></textarea>
        </div>
        <div className="mb-5">
          <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Ubicación:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default EventEdit;
