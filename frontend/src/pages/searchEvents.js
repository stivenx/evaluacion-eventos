import React,{useEffect, useState} from "react";
import api from "../configApi/api";
import { useLocation } from "react-router-dom";
import EventCard from "../components/eventsCard";



const SearchEvents = () => {
    const [events, setEvents] = useState([]);
    const location = useLocation();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const nameParam = params.get("title") || "";
        setQuery();

        if (nameParam.length >= 3) {
            fetchEvents(nameParam);
        }
    }, [location.search]);

    const fetchEvents = async (SearchEvents) => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get(`/events/search/${SearchEvents}`);
            setEvents(response.data);
        } catch (error) {
            setError("error al buscar eventos");
        } finally {
            setLoading(false);
        }
    };

    return (
     <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Buscar eventos</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ingresa el nombre del evento..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => {
            window.history.pushState({}, "", `/search?title=${query}`);
            fetchEvents(query);
          }}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
        {events.length === 0 && !loading && !error && (
          <p className="text-gray-500">No se encontraron eventos</p>
        )}
      </div>
    </div>
    );
};

export default SearchEvents;