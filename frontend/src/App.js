// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//User
import AddBooking from "./components/Room_Booking/User/AddBooking/AddBooking";
import MyBooking from "./components/Room_Booking/User/Booking/MyBooking";

//Admin
import Booking from "./components/Room_Booking/Admin/Booking/Bookings";
import UpdateBooking from "./components/Room_Booking/Admin/Booking/UpdateBooking";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* User Route */}
          <Route exact path="/" element={<AddBooking />} />
          <Route exact path="/my-booking/:id" element={<MyBooking />} /> 
          
          {/* Admin Routes */}
          <Route exact path="/view-booking" element={<Booking />} />
          <Route exact path="/update-room/:id" element={<UpdateBooking />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
