import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBooking = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
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
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/rooms/", inputs);
      alert("Room booked successfully.");
      history(`/my-booking/${response.data.room._id}`); // Navigate to the booked room details page
    } catch (error) {
      console.error("Error booking room:", error);
      // Handle error and provide feedback to the user
    }
  };
  

  return (
    <div className="booking-container">
      <h2 className="booking-header">Book a Room</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div>
          <label className="booking-label">Name:</label>
          <input
            className="booking-input"
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="booking-label">Email:</label>
          <input
            className="booking-input"
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="booking-label">Address:</label>
          <input
            className="booking-input"
            type="text"
            name="address"
            value={inputs.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="booking-label">City:</label>
          <input
            className="booking-input"
            type="text"
            name="city"
            value={inputs.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="booking-label">Postal Code:</label>
          <input
            className="booking-input"
            type="text"
            name="code"
            value={inputs.code}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="booking-label">Phone Number:</label>
          <input
            className="booking-input"
            type="tel"
            name="phone"
            value={inputs.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="booking-label">Number of Adults:</label>
          <input
            className="booking-input"
            type="number"
            name="adults"
            value={inputs.adults}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="booking-label">Number of Kids:</label>
          <input
            className="booking-input"
            type="number"
            name="kids"
            value={inputs.kids}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="booking-label">Room Type:</label>
          <input
            className="booking-input"
            type="text"
            name="room"
            value={inputs.room}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="booking-label">Special Requests:</label>
          <textarea
            className="booking-input"
            name="request"
            value={inputs.request}
            onChange={handleChange}
          ></textarea>
        </div>
        <br></br>
        {error && <p className="booking-error-message">{error}</p>}
        <button className="bookbtn" type="submit">
          Book Room
        </button>
      </form>
    </div>
  );
};

export default AddBooking;
