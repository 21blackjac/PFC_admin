import React, { useEffect, useState } from "react";
import TourForm from "./ModalForms/TourForm";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const ToursList = () => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async () => {
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
      setIsModalOpen(false);
      fetchTours();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (tour) => {
    setForm(tour);
    setEditingId(tour.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tours/${id}`);
      fetchTours();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTours = tours.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5 bg-dark text-light p-4 rounded">
      <h1 className="text-center mb-4">Tour Management</h1>

      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search tours..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: "300px", height: "40px" }}
        />
        <button
          className="btn btn-success"
          style={{ height: "40px" }}
          onClick={() => {
            setForm({
              title: "",
              description: "",
              price: "",
              duration_days: "",
              destination_id: "",
              image_url: "",
            });
            setEditingId(null);
            setIsModalOpen(true);
          }}
        >
          <FaPlus className="me-1" /> Add Tour
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-dark table-striped">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
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
            {filteredTours.map((t) => (
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
                    className="rounded"
                    style={{
                      width: "60px",
                      height: "45px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(t)}
                  >
                    <FaEdit className="me-1" /> Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(t.id)}
                  >
                    <FaTrash className="me-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TourForm
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        editingId={editingId}
      />
    </div>
  );
};

export default ToursList;
