import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingForm from "../components/ModalForms/BookingForm";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    user_id: "",
    tour_id: "",
    booking_date: "",
    number_of_people: 1,
    total_price: "",
    status: "pending",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/bookings");
      setBookings(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/api/bookings", form);
      fetchBookings();
      setIsModalOpen(false);
      toast.success("Booking created successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBookings = bookings.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5 bg-dark text-light p-4 rounded">
      <h1 className="my-4 text-center">
        Bookings
      </h1>
      <div className="d-flex justify-content-between">
        <input
          type="text"
          className="form-control"
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: "auto", height: "40px" }}
        />
        <button
          className="btn btn-success mb-4 w-48"
          style={{ height: "40px" }}
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="d-inline" /> Add Booking
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-dark table-striped">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th>User ID</th>
              <th>Tour ID</th>
              <th>Date</th>
              <th>People</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.user_id}</td>
                <td>{booking.tour_id}</td>
                <td>{booking.booking_date}</td>
                <td>{booking.number_of_people}</td>
                <td>{booking.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BookingForm
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default BookingsList;
