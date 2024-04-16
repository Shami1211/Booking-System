const Room = require("../Model/Room");

const getAllRooms = async (req, res, next) => {
  let rooms;
  try {
    rooms = await Room.find();
  } catch (err) {
    console.log(err);
  }

  if (!rooms || rooms.length === 0) {
    return res.status(404).json({ message: "No rooms found" });
  }
  return res.status(200).json({ rooms });
};

const getRoomById = async (req, res, next) => {
  const id = req.params.id;
  let room;
  try {
    room = await Room.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }
  return res.status(200).json({ room });
};

const addRoom = async (req, res, next) => {
  const { name, email, address, city, code, phone, adults, kids, room, request } = req.body;
  let newRoom;
  try {
    newRoom = new Room({
      name,
      email,
      address,
      city,
      code,
      phone,
      adults,
      kids,
      room,
      request,
    });
    await newRoom.save();
  } catch (err) {
    console.log(err);
  }

  if (!newRoom) {
    return res.status(500).json({ message: "Unable to add room" });
  }
  return res.status(201).json({ room: newRoom });
};

const updateRoom = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, address, city, code, phone, adults, kids, room, request } = req.body;
  let roomToUpdate;
  try {
    roomToUpdate = await Room.findById(id);
    if (!roomToUpdate) {
      return res.status(404).json({ message: "Room not found" });
    }
    roomToUpdate.name = name;
    roomToUpdate.email = email;
    roomToUpdate.address = address;
    roomToUpdate.city = city;
    roomToUpdate.code = code;
    roomToUpdate.phone = phone;
    roomToUpdate.adults = adults;
    roomToUpdate.kids = kids;
    roomToUpdate.room = room;
    roomToUpdate.request = request;
    await roomToUpdate.save();
  } catch (err) {
    console.log(err);
  }

  if (!roomToUpdate) {
    return res.status(500).json({ message: "Unable to update room" });
  }
  return res.status(200).json({ room: roomToUpdate });
};

const deleteRoom = async (req, res, next) => {
  const id = req.params.id;
  try {
    const room = await Room.findByIdAndDelete(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllRooms = getAllRooms;
exports.addRoom = addRoom;
exports.getRoomById = getRoomById;
exports.updateRoom = updateRoom;
exports.deleteRoom = deleteRoom;
