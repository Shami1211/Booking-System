import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBooking = () => {
  const { id } = useParams(); // Get the ID parameter from the URL
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    code: "",
    phone: "",
    adults: 0,
    kids: 0,
    room: "",
    request: "",
  });

  useEffect(() => {
    fetchRoomData();
  }, []);

  const fetchRoomData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/rooms/${id}`);
      setRoomData(response.data.room);
    } catch (error) {
      console.error("Error fetching room data:", error);
      // Handle error and provide feedback to the user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/rooms/${id}`, roomData);
      alert("Room updated successfully.");
     navigate("/view-booking"); // Redirect to the booking page after successful update
    } catch (error) {
      console.error("Error updating room:", error);
      // Handle error and provide feedback to the user
    }
  };

  return (
    <div>
      <h1>Update Room</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={roomData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={roomData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={roomData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={roomData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Postal Code:</label>
          <input
            type="text"
            name="code"
            value={roomData.code}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={roomData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Number of Adults:</label>
          <input
            type="number"
            name="adults"
            value={roomData.adults}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Number of Kids:</label>
          <input
            type="number"
            name="kids"
            value={roomData.kids}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Room Type:</label>
          <input
            type="text"
            name="room"
            value={roomData.room}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Special Requests:</label>
          <textarea
            name="request"
            value={roomData.request}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Update Room</button>
      </form>
    </div>
  );
};

export default UpdateBooking;
