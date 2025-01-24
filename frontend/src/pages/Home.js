import React, {useEffect} from "react";
import api from "../configApi/api";
import EventCard from "../components/eventsCard";


const Home = () => {
    const [events, setEvents] = React.useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get("/events");
                setEvents(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="flex flex-wrap items-center justify-center">
               <h1 className="w-full text-5xl font-bold text-center p-8 dark:text-white ">Eventos</h1>
                {events.map((event) => (
                    <EventCard key={event._id} event={event} className="shadow-md rounded-md" />
                ))}
            </div>
        </section>
    )
};


export default Home;