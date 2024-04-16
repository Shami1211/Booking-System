const express = require("express");
const router = express.Router();
const Room = require("../Model/Room");
const roomController = require("../Controllers/RoomController");

router.get("/", roomController.getAllRooms);
router.post("/", roomController.addRoom);
router.get("/:id", roomController.getRoomById);
router.put("/:id", roomController.updateRoom);
router.delete("/:id", roomController.deleteRoom);

module.exports = router;
