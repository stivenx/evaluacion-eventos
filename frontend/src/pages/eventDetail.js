import React,{useEffect, useState} from "react";
import api from "../configApi/api";
import { useParams } from "react-router-dom";



const EventDetail = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [Start, setStartTime] = useState('');
    const [timeEnd, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');


    useEffect(() => {
        const fetchEvent = async () => {
            try {
              const response = await api.get(`/events/${id}`);
              const fecha = new Date(response.data.date);
              const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              });
              
              setTitle(response.data.title);
              setDate(fechaFormateada);
              setStartTime(response.data.time.start);
              setEndTime(response.data.time.end);
              setDescription(response.data.description);
              setLocation(response.data.location);
            } catch (error) {
              console.error(error);
            }
          };
        fetchEvent();
    }, [id]);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-16 space-y-8 md:space-y-10 sm:p-20">
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl dark:text-white text-center whitespace-nowrap">
                  {title}
                </h1>
                <form className="space-y-8 md:space-y-10" action="#">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">  
                      <b>Fecha:</b> {date}
                    </label>
                  </div>
                  <div>  
                    <label htmlFor="email" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">  
                      <b>Hora de inicio:</b> {Start}
                    </label>
                  </div>
                  <div>  
                    <label htmlFor="email" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">  
                      <b>Hora de fin:</b> {timeEnd}
                    </label>
                  </div>
                  <div>  
                    <label htmlFor="email" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">  
                      <b>Descripción:</b> {description}
                    </label>
                  </div>
                  <div>  
                    <label htmlFor="email" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">  
                      <b>Ubicación:</b> {location}
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      );

};

export default EventDetail;