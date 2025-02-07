import React, { useEffect, useState } from "react";
import api from "../configApi/api";
import { useParams } from "react-router-dom";


const TareasUser = () => {
    const { id } = useParams();
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        const fetchTareas = async () => {
            try {
                const response = await api.get(`/tareas/user/${id}`);
                setTareas(response.data);
            } catch (error) {
                console.error("Error al obtener tareas:", error);
            }
        };

        fetchTareas();
    }, [id]);

    return (
        <div className="max-w-4xl mx-auto p-6">
  <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
    📌 Tareas del Usuario
  </h1>

  {tareas.length > 0 ? (
    tareas.map((tarea) => (
      <div
        key={tarea._id}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4 border-l-4 
                  border-blue-500 dark:border-blue-400 transition-all duration-300 hover:shadow-lg"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {tarea.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-1">{tarea.description}</p>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>
            <span className="font-semibold">Estado:</span>{" "}
            <span
              className={`px-2 py-1 rounded-md text-white ${
                tarea.status === "completada"
                  ? "bg-green-500"
                  : tarea.status === "en curso"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {tarea.status}
            </span>
          </p>
          <p>
            <span className="font-semibold">Fecha límite:</span>{" "}
            {tarea.date
              ? new Date(tarea.date).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Sin fecha"}
          </p>
          <p>
            <span className="font-semibold">Prioridad:</span> {tarea.priority}
          </p>
        </div>

        <hr className="mt-4 border-gray-300 dark:border-gray-700" />
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500 dark:text-gray-400">
      No hay tareas disponibles.
    </p>
  )}
</div>

    );
};

export default TareasUser;
