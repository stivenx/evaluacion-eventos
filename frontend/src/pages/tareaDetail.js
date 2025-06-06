import React,{useEffect, useState} from "react";
import api from "../configApi/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const TareaDetail = () => {
    const { id } = useParams();
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [priority,setPriority] = useState('');
    const [status,setStatus] = useState('');
    const [user,setUser] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchTarea = async () => {
            try {
                const response = await api.get(`/tareas/${id}`);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setDate(response.data.date);
                setPriority(response.data.priority);
                setStatus(response.data.status);
                setUser(response.data.user);
            } catch (error) {
                console.error("Error al obtener la tarea:", error);
            }
        };

        fetchTarea();
    }, [id]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">Detalles de la Tarea</h1>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4 border-l-4 border-blue-500 dark:border-blue-400 transition-all duration-300 hover:shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Descripción: {description}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Fecha limite: {date
                    ? new Date(date).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        })
                      : "Sin fecha"}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Prioridad: {priority}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Estado: 
                     <span
                      className={`px-2 py-1 rounded-md text-white ${
                    status === "completada"
                    ? "bg-green-500"
                    : status === "en curso"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                        }`}
                        >
                         {status}

                        </span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Responsable: {Array.isArray(user) && user.length > 0
                                    ? user.map((u) => u.userName).join(", ")
                                    : "Sin usuario"} </p>
                <td className="px-6 py-4">
                     <button onClick={() => navigate(`/tareas/edit/${id}`)} className="text-primary-500 hover:underline">Edit</button>
                </td>
            </div>
        </div>
    );
};

export default TareaDetail;