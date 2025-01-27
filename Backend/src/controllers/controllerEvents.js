const Events = require("../models/events");



exports.getEvents = async (req, res) => {
    try {
        const events = await Events.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los eventos" });
    }
};

exports.getEventsByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    const events = await Events.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({
      date: 1
    });
    
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los eventos por fecha" });
  }
};

exports.getEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Events.findById(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el evento" });
    }
};

exports.createEvent = async (req, res) => {
    try {
      const { title, date, time, description, location } = req.body;
      if (!/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM|am|pm)$/.test(time.start) || !/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM|am|pm)$/.test(time.end)) {
        return res.status(400).json({ message: "El campo time no es válido" });
      }
      const event = new Events({ title, date, time, description, location });
      await event.save();
      res.status(201).json({ message: "Evento creado con éxito" });
    } catch (error) {
      res.status(500).json({ message: "Error al crear el evento" });
    }
};

exports.updateEvent = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, date, time, description, location } = req.body;
      if (!/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM|am|pm)$/.test(time.start) || !/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM|am|pm)$/.test(time.end)) {
        return res.status(400).json({ message: "El campo time no es válido" });
      }
      const event = await Events.findByIdAndUpdate(id, { title, date, time, description, location }, { new: true });
      res.status(200).json(event);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el evento" });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Events.findByIdAndDelete(id);
        res.status(200).json({ message: "Evento eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el evento" });
    }
};

