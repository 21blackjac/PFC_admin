import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

export default function BookingsList() {
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

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8000/api/bookings/${editingId}`,
          form
        );
      } else {
        await axios.post("http://localhost:8000/api/bookings", form);
      }
      setForm({
        user_id: "",
        tour_id: "",
        booking_date: "",
        number_of_people: 1,
        total_price: "",
        status: "pending",
      });
      setEditingId(null);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (booking) => {
    setForm(booking);
    setEditingId(booking.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-base-200 p-4 rounded-box"
      >
        <input
          name="user_id"
          value={form.user_id}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="User ID"
          required
        />
        <input
          name="tour_id"
          value={form.tour_id}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Tour ID"
          required
        />
        <input
          type="date"
          name="booking_date"
          value={form.booking_date}
          onChange={handleChange}
          className="input input-bordered"
        />
        <input
          type="number"
          name="number_of_people"
          value={form.number_of_people}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="People"
        />
        <input
          name="total_price"
          value={form.total_price}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Total Price"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="select select-bordered"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button className="btn btn-success col-span-1 md:col-span-2">
          <FaPlus className="mr-2" /> {editingId ? "Update Booking" : "Add Booking"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Tour</th>
              <th>Date</th>
              <th>People</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.user_id}</td>
                <td>{b.tour_id}</td>
                <td>{b.booking_date}</td>
                <td>{b.number_of_people}</td>
                <td>{b.total_price}</td>
                <td>{b.status}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleEdit(b)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
