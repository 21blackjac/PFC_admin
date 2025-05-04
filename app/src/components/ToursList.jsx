import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

export default function ToursList() {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    duration_days: "",
    destination_id: "",
    image_url: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTours = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/tours");
      setTours(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/tours/${editingId}`, form);
      } else {
        await axios.post("http://localhost:8000/api/tours", form);
      }
      setForm({
        title: "",
        description: "",
        price: "",
        duration_days: "",
        destination_id: "",
        image_url: "",
      });
      setEditingId(null);
      fetchTours();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (tour) => {
    setForm(tour);
    setEditingId(tour.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tours/${id}`);
      fetchTours();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Tour Management</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-base-200 p-6 rounded-box mb-8 shadow"
      >
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Title"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Price"
          required
        />
        <input
          name="duration_days"
          value={form.duration_days}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Duration (Days)"
          required
        />
        <input
          name="destination_id"
          value={form.destination_id}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Destination ID"
          required
        />
        <input
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Image URL"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="textarea textarea-bordered col-span-full"
          placeholder="Description"
        ></textarea>
        <button className="btn btn-success w-full col-span-full">
          <FaPlus className="mr-2" /> {editingId ? "Update Tour" : "Add Tour"}
        </button>
      </form>

      <div className="overflow-x-auto bg-base-200 rounded-box shadow">
        <table className="table w-full">
          <thead className="bg-base-300">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Destination</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.title}</td>
                <td>{t.price}</td>
                <td>{t.duration_days} days</td>
                <td>{t.destination_id}</td>
                <td>
                  <img
                    src={t.image_url}
                    alt="tour"
                    className="w-16 h-12 object-cover rounded"
                  />
                </td>
                <td className="flex flex-wrap gap-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(t.id)}
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
