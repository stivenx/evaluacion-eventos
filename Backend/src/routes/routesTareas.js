const express = require("express");
const router = express.Router();

const { createTarea, getTareas, getTarea, updateTarea, deleteTarea, getTareasByUser, getTareasByStatus } = require("../controllers/controllerTareas");

router.post("/", createTarea);
router.get("/", getTareas);
router.get("/:id", getTarea);
router.get("/user/:id", getTareasByUser);
router.get("/status/:status", getTareasByStatus);
router.patch("/update/:id", updateTarea);
router.delete("/delete/:id", deleteTarea);

module.exports = router;