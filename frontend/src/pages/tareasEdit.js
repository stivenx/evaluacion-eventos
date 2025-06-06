import React, {useState} from "react";
import api from "../configApi/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";



const TareasEdit = () => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [user,setUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const { id } = useParams();
   
   
    const navigate = useNavigate();
    useEffect(() => {
        const fetchTareas = async () => {
          try {
            const response = await api.get(`/tareas/${id}`);
            const tareaData = response.data;
    
            // Asegurar que la fecha esté en formato ISO
            const formattedDate = new Date(tareaData.date).toISOString().split("T")[0];
    
            setTitle(tareaData.title);
            setDescription(tareaData.description);
            setPriority(tareaData.priority);
            setDate(formattedDate);
            setStatus(tareaData.status);
            setSelectedUser(tareaData.user?._id || ""); // Establece el usuario de la tarea
            
          } catch (error) {
            console.error("Error al cargar el evento:", error);
          }
        };
    
        fetchTareas();
      }, [id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
         
    
          const response = await api.patch(`/tareas/update/${id}`, {
            title,
            description,
            date,
            priority,
            status,
            user:selectedUser
          });
    
          console.log(response.data);
          alert('tarea actualizada con éxito.');
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

      

      return (
        <div className="h-screen flex flex-col justify-center bg-white dark:bg-gray-900">
          <h1 className="text-4xl font-semibold text-primary-900 dark:text-white text-center mb-8">
            actualizar una tarea
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
                  Estado:
              </label>
              <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                  <option value="">Seleccione un estado</option>
                  <option value="completada">Completada</option>
                  <option value="en curso">En curso</option>
                  <option value="pendiente">Pendiente</option>
              </select>
          </div>

            
            
              <div className="mb-5">
                <label htmlFor="user" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Usuario:
                </label>
                <select
                  id="user"
                  value={selectedUser}
                  onChange={(e) =>
                    setSelectedUser(Array.from(e.target.selectedOptions, (option) => option.value))
                  }
                  multiple
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                >
                  <option disabled value="">Seleccione uno o varios usuarios</option>
                  {user.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.userName}
                    </option>
                  ))}
                </select>

              </div>
              {selectedUser.length > 0 && (
                <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  <p className="font-medium">Usuarios seleccionados:</p>
                  <ul className="list-disc ml-5">
                    {selectedUser.map((userId) => {
                      const userData = user.find((u) => u._id === userId);
                      return (
                        <li key={userId}>
                          {userData?.userName || "Usuario no encontrado"}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}


            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Guardar
            </button>
          </form>
        </div>
      );
    };



export default TareasEdit;