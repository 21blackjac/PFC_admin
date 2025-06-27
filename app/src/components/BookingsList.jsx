import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingForm from "../components/ModalForms/BookingForm";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    user_id: "",
    tour_id: "",
    nbr_personnes: 1,
    reservation_date: "",
    total_price: "",
    status: "pending",
  });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/reservations"
      );
      setBookings(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`http://127.0.0.1:8000/api/reservations/${editingId}`, {
          user_id: form.user_id,
          tour_id: form.tour_id,
          nbr_personnes: form.nbr_personnes,
          reservation_date: form.reservation_date,
          total_price: form.total_price,
          status: form.status,
        });
        toast.success("Booking updated successfully");
      } else {
        await axios.post("http://127.0.0.1:8000/api/reservations", {
          user_id: form.user_id,
          tour_id: form.tour_id,
          nbr_personnes: form.nbr_personnes,
          reservation_date: form.reservation_date,
          total_price: form.total_price,
          status: form.status,
        });
        toast.success("Booking created successfully");
      }

      fetchBookings();
      setIsModalOpen(false);
      setForm({
        user_id: "",
        tour_id: "",
        nbr_personnes: 1,
        reservation_date: "",
        total_price: "",
        status: "pending",
      });
      setEditingId(null);
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to save booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = (bookings || []).filter((booking) => {
    const term = searchTerm.toLowerCase();

    const userId = booking.user_id?.toString() ?? "";
    const tourId = booking.tour_id?.toString() ?? "";
    const userName = booking.user?.name?.toLowerCase() ?? "";

    return (
      userId.includes(term) || tourId.includes(term) || userName.includes(term)
    );
  });

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
              reservation_date: "",
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
              <th>User Name</th>
              <th>Tour Name</th>
              <th>People</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>created_at</th>
              <th>updated_at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.user?.name ?? booking.user_id}</td>
                <td>{booking.tour?.title ?? booking.tour_id}</td>
                <td>{booking.nbr_personnes}</td>
                <td>{booking.reservation_date}</td>
                <td>{booking.total_price}</td>
                <td>{booking.status}</td>
                <td>{new Date(booking.created_at).toLocaleString()}</td>
                <td>{new Date(booking.updated_at).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-primary me-2 d-inline-flex"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      setForm({
                        user_id: booking.user_id,
                        tour_id: booking.tour_id,
                        nbr_personnes: booking.nbr_personnes,
                        date: booking.reservation_date,
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
                    className="btn btn-danger d-inline-flex"
                    onClick={async () => {
                      try {
                        await axios.delete(
                          `http://127.0.0.1:8000/api/reservations/${booking.id}`
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
