const express = require("express");
const router = express.Router();

const { createTarea, getTareas, getTarea, updateTarea, deleteTarea, getTareasByUser, getTareasByStatus,getUsuariosConDosTareasOMenos } = require("../controllers/controllerTareas");

router.post("/", createTarea);
router.get("/", getTareas);
router.get("/:id", getTarea);
router.get("/user/:id", getTareasByUser);
router.get("/status/:status", getTareasByStatus);
router.patch("/update/:id", updateTarea);
router.delete("/delete/:id", deleteTarea);
router.get("/2tareas", getUsuariosConDosTareasOMenos);

module.exports = router;