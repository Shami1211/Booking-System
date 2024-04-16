import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyBooking = () => {
  const { id } = useParams(); // Get the ID parameter from the URL
  const [roomData, setRoomData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRoomData();
  }, []);

  const fetchRoomData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/rooms/${id}`);
      setRoomData(response.data.room);
      setLoading(false);
    } catch (error) {
      setError("Error fetching room details.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>My Booking Details</h1>
      <div>
        <p>Name: {roomData.name}</p>
        <p>Email: {roomData.email}</p>
        <p>Address: {roomData.address}</p>
        <p>City: {roomData.city}</p>
        <p>Postal Code: {roomData.code}</p>
        <p>Phone Number: {roomData.phone}</p>
        <p>Number of Adults: {roomData.adults}</p>
        <p>Number of Kids: {roomData.kids}</p>
        <p>Room Type: {roomData.room}</p>
        <p>Special Requests: {roomData.request}</p>
      </div>
    </div>
  );
};

export default MyBooking;
