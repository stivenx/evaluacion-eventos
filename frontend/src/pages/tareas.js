import React, { useEffect, useState } from "react";
import api from "../configApi/api";
import { useNavigate } from "react-router-dom";

const Tareas = () => {
  const [tareas, setTareas] = useState([]);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
      if (status) {
          fetchTareasByStatus(status);
      } else {
          fetchTareas();
      }
  }, [status]);

 

  const fetchTareas = async () => {
      try {
         
          const response = await api.get("/tareas");
          setTareas(response.data);
      } catch (error) {
          console.error("Error al obtener tareas:", error);
      }
  };

  const fetchTareasByStatus = async (status) => {
      try {
          const response = await api.get(`/tareas/status/${status}`);
          setTareas(response.data);
      } catch (error) {
          console.error("Error al obtener tareas por estado:", error);
      }
  };

  const handleDelete = async (tareaId) => {
      try {
          const response = await api.delete(`/tareas/delete/${tareaId}`);
          if (response.status === 200) {
              setTareas((prevTareas) => prevTareas.filter((tarea) => tarea._id !== tareaId));
              alert("El evento ha sido eliminado con éxito.");
          } else {
              alert("No se pudo eliminar la tarea.");
          }
      } catch (error) {
          console.error("Error al eliminar la tarea:", error);
          alert("Hubo un problema al eliminar la tarea.");
      }
  };

  return (
      <div className="relative overflow-x-auto shadow-md">
          <div className="flex justify-between items-center px-4 py-2 bg-primary-100 dark:bg-primary-800">
              <h2 className="text-xl font-semibold text-primary-900 dark:text-white">Tareas</h2>

              <div className="flex items-center space-x-2">
                  <label className="block text-sm font-medium text-gray-900 dark:text-white">Status:</label>
                  <select value={status}
                      className="bg-gray-50 border text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => setStatus(e.target.value)}
                  >
                      <option value="">Todos</option>
                      <option value="en curso">En curso</option>
                      <option value="pendiente">Pendiente</option>
                      <option value="completada">Completada</option>
                  </select>
              </div>

              <a href="/tareas/create" className="px-4 py-2 bg-primary-700 text-white hover:bg-primary-600">
                  Add tarea
              </a>
          </div>

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Fecha de vencimiento</th>
                      <th className="px-6 py-3">Description</th>
                      <th className="px-6 py-3">Priority</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">User</th>
                      <th className="px-6 py-3">Edit</th>
                      <th className="px-6 py-3">Delete</th>
                  </tr>
              </thead>
              <tbody>
                  {tareas.length === 0 ? (
                      <tr>
                          <td colSpan="8" className="px-6 py-4 text-center">
                              No hay tareas disponibles.
                          </td>
                      </tr>
                  ) : (
                      tareas.map((tarea) => (
                          <tr key={tarea._id} className="odd:bg-white even:bg-gray-50 border-b dark:bg-gray-900 dark:border-gray-700">
                              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{tarea.title}</td>
                              <td className="px-6 py-4">
                                  {tarea.date ? new Date(tarea.date).toLocaleDateString("es-ES", {
                                      day: "numeric",
                                      month: "long",
                                      year: "numeric",
                                  }) : "Sin fecha"}
                              </td>
                              <td className="px-6 py-4">{tarea.description}</td>
                              <td className="px-6 py-4">{tarea.priority}</td>
                              <td className="px-6 py-4">{tarea.status}</td>
                              <td className="px-6 py-4">{tarea.user?.userName || "Sin usuario"}</td>
                              <td className="px-6 py-4">
                                  <button onClick={() => navigate(`/tareas/edit/${tarea._id}`)} className="text-primary-500 hover:underline">Edit</button>
                              </td>
                              <td className="px-6 py-4">
                                  <button onClick={() => handleDelete(tarea._id)} className="text-red-500 hover:underline">Delete</button>
                              </td>
                          </tr>
                      ))
                  )}
              </tbody>
          </table>
      </div>
  );
};

export default Tareas;