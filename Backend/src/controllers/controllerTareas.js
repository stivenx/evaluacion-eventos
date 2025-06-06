const Tarea = require("../models/tareas");
const User = require("../models/users");


exports.createTarea = async (req, res) => {
    try {
        const { title, description, date, priority, status, user } = req.body;
        const userExist = await User.findById(user);
        if (!userExist) {
            return res.status(400).json({ message: "El usuario no existe" });
        }
        const tarea = new Tarea({ title, description, date, priority, status, user });
        await tarea.save();
        res.status(201).json(tarea);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea" });
    }
};


exports.getTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find().populate("user");
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las tareas" });
    }
};

exports.getTareasByUser = async (req, res) => {
    try {
      const { id } = req.params;
      const tareas = await Tarea.find({ user: id }).sort({ date: 1 }).populate("user");
      res.status(200).json(tareas);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las tareas del usuario" });
    }
};
  
exports.getTareasByStatus = async (req, res) => {
    try {
      const { status } = req.params;
      const tareas = await Tarea.find({ status: { $regex: status, $options: "i" } }).sort({ date: 1 }).populate("user");
      res.status(200).json(tareas);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las tareas por estado" });
    }
};

exports.getTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tarea = await Tarea.findById(id).populate("user");
        if (!tarea) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la tarea" });
    }
};


exports.updateTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, priority, status, user } = req.body;
        const userExist = await User.findById(user);
        if (!userExist) {
            return res.status(400).json({ message: "El usuario no existe" });
        }
        const tarea = await Tarea.findByIdAndUpdate(id, { title, description, date, priority, status, user }, { new: true });
        if (!tarea) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la tarea" });
    }
};

exports.deleteTarea = async (req, res) => {
    try {
        const { id } = req.params;
        const tarea = await Tarea.findByIdAndDelete(id);
        if (!tarea) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        res.status(200).json({ message: "Tarea eliminada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la tarea" });
    }
};



exports.getUsuariosConDosTareasOMenos = async (req, res) => {
  try {
    const resultado = await Tarea.aggregate([
      {
        $group: {
          _id: "$user",           // agrupamos por el campo user (ID del usuario)
          totalTareas: { $sum: 1 } // contamos las tareas
        }
      },
      {
        $match: {
          totalTareas: { $lte: 2 } // solo los que tienen 2 tareas o menos
        }
      },
      {
        $lookup: {
          from: "users",           // nombre de la colección de usuarios (en minúsculas y plural por defecto)
          localField: "_id",       // campo en este resultado (el user ID)
          foreignField: "_id",     // campo en User
          as: "usuer"
        }
      },
      {
        $unwind: "$user"        // descomprime el array de usuario para tener un objeto simple
      },
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          userName: "$user.userName",
          totalTareas: 1
        }
      }
    ]);

    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios con dos tareas o menos" });
  }
};
