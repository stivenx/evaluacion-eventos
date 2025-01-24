const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middleware/authMiddlewares");

const { createEvent, getEvents, getEvent, updateEvent, deleteEvent, getEventsByDate } = require("../controllers/controllerEvents");

router.post("/",verifyToken, createEvent);
router.get("/", getEvents);
router.get("/:id", getEvent);
router.get("/date/:startDate/:endDate", getEventsByDate);
router.patch("/update/:id",verifyToken, updateEvent);
router.delete("/delete/:id", verifyToken,deleteEvent);

module.exports = router;