import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import BookingForm from "../components/ModalForms/BookingForm";

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
  const [editingId, setEditingId] = useState(null);
  const modalRef = useRef();

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/bookings");
      setBookings(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Submit booking (create or update)
  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8000/api/bookings/${editingId}`,
          form
        );
      } else {
        await axios.post("http://localhost:8000/api/bookings", form);
      }
      fetchBookings();
      setEditingId(null);
      modalRef.current.closeModal(); // hide modal
    } catch (err) {
      console.error(err);
    }
  };

  // Show modal with empty form
  const handleAddBooking = () => {
    setForm({
      user_id: "",
      tour_id: "",
      booking_date: "",
      number_of_people: 1,
      total_price: "",
      status: "pending",
    });
    setEditingId(null);
    modalRef.current?.showModal();
  };

  // Edit booking
  const handleEdit = (booking) => {
    setForm(booking);
    setEditingId(booking.id);
    modalRef.current?.showModal();
  };

  // Delete booking
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4" style={{ color: "wheat" }}>
        Bookings
      </h1>

      <button className="btn btn-success mb-4" onClick={handleAddBooking}>
        Add Booking
      </button>

      <table className="table w-full bg-white shadow-md">
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
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.user_id}</td>
              <td>{booking.tour_id}</td>
              <td>{booking.booking_date}</td>
              <td>{booking.number_of_people}</td>
              <td>{booking.total_price}</td>
              <td>{booking.status}</td>
              <td className="space-x-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => handleEdit(booking)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(booking.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Booking Modal */}
      <BookingForm
        ref={modalRef}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
      />
    </div>
  );
};

export default BookingsList;
