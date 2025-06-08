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
    nbr_personnes: 1,
    total_price: "",
    status: "pending",
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/reservations"
      );
      setBookings(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8000/api/reservations/${editingId}`,form);
        toast.success("Booking updated successfully");
      } else {
        await axios.post("http://localhost:8000/api/reservations", form);
        toast.success("Booking created successfully");
      }

      fetchBookings();
      setIsModalOpen(false);
      setForm({
        user_id: "",
        tour_id: "",
        nbr_personnes: 1,
        total_price: "",
        status: "pending",
      });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter((booking) =>
    booking.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5 bg-dark text-light p-4 rounded">
      <h1 className="my-4 text-center">Bookings</h1>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "auto", height: "40px" }}
        />
        <button
          className="btn btn-success mb-4 w-48"
          style={{ height: "40px" }}
          onClick={() => {
            setForm({
              user_id: "",
              tour_id: "",
              nbr_personnes: 1,
              total_price: "",
              status: "pending",
            });
            setEditingId(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus className="d-inline" /> Add Booking
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Tour ID</th>
              <th>Date</th>
              <th>People</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.user_id}</td>
                <td>{booking.tour_id}</td>
                <td>{booking.reservation_date}</td>
                <td>{booking.nbr_personnes}</td>
                <td>{booking.total_price}</td>
                <td>{booking.status}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                      setForm({
                        user_id: booking.user_id,
                        tour_id: booking.tour_id,
                        nbr_personnes: booking.nbr_personnes,
                        total_price: booking.total_price,
                        status: booking.status,
                      });
                      setEditingId(booking.id);
                      setIsModalOpen(true);
                    }}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={async () => {
                      try {
                        await axios.delete(
                          `http://localhost:8000/api/reservations/${booking.id}`
                        );
                        fetchBookings();
                        toast.success("Booking deleted successfully");
                      } catch (err) {
                        console.error(err);
                        toast.error("Failed to delete booking");
                      }
                    }}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
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
