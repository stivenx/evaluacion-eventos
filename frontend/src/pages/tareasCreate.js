import React, {useState, useEffect} from "react";
import api from "../configApi/api";
import { useNavigate } from "react-router-dom";



const TareasCreate = () => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [user,setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
   
   
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if(status.toLowerCase() !== "en curso" && status.toLowerCase() !== "pendiente" && status.toLowerCase() !== "completada"){
            alert("El status debe ser 'en curso', 'pendiente' o 'completada'");
            return;
          }

    
          const response = await api.post('/tareas/', {
            title,
            description,
            date,
            priority,
            status,
            user: selectedUser
          });
    
          console.log(response.data);
          alert('tarea creado con éxito.');
          navigate('/tareas');
        } catch (error) {
          if (error.response) {
            alert(error.response.data.message || 'Error al crear la tarea');
          } else {
            console.error('Detalles del error:', error);
            alert('Hubo un error al crear la tarea.');
          }
        }
      };

        useEffect(() => {
              const fetchUsers = async () => {
                  try {
                      const response = await api.get("/users");
                      setUser(response.data);
                  } catch (error) {
                      console.error("Error al obtener usuarios:", error);
                  }
              };
      
              fetchUsers();
          }, []);


      return (
        <div className="h-screen flex flex-col justify-center bg-white dark:bg-gray-900">
          <h1 className="text-4xl font-semibold text-primary-900 dark:text-white text-center mb-8">
            Crear una nueva tarea
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
              <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Priority:
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Seleccione una prioridad</option>
                <option value="alta">Alta</option>
                <option value="mediana">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
              <div className="mb-5">
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Status:
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Seleccione un status</option>
                  <option value="completada">Completada</option>
                  <option value="En curso">En curso</option>
                  <option value="Pendiente">Pendiente</option>
                </select>
              </div>
            
            
            <div className="mb-5">
              <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                user:
              </label>
              <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
               required
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Seleccione un usuario</option>
                {user.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.userName}
                  </option>
                ))}
              </select>

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



export default TareasCreate;