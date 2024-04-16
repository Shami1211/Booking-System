import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Room = ({ room, onDelete }) => {
  const { _id, name, email, address, city, code, phone, adults, kids, room: roomType, request } = room;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete room ${name}?`);
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/rooms/${_id}`);
        onDelete(_id);
        alert("Room deleted successfully.");
        window.location.reload();
      } catch (error) {
        // Handle error and provide feedback to the user
      }
    }
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{city}</td>
      <td>{code}</td>
      <td>{phone}</td>
      <td>{adults}</td>
      <td>{kids}</td>
      <td>{roomType}</td>
      <td>{request}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
        <Link to={`/update-room/${_id}`}>
          <button>Update</button>
        </Link>
      </td>
    </tr>
  );
};

const Booking = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/rooms");
      setRooms(response.data.rooms);
    } catch (error) {
      setError("Error fetching rooms.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/rooms/${id}`);
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== id));
      alert("Room deleted successfully.");
    } catch (error) {
      // Handle error and provide feedback to the user
    }
  };

  return (
    <div>
      <h1>Booked Rooms List</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>Postal Code</th>
            <th>Phone Number</th>
            <th>Adults</th>
            <th>Kids</th>
            <th>Room Type</th>
            <th>Special Request</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <Room key={room._id} room={room} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Booking;
