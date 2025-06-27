import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import TourForm from "./ModalForms/TourForm";

const ToursList = () => {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    destination_id: "",
    categorie_id: "",
    nbr_jours: "",
    nbr_places: "",
    duration_date: "",
    image_url: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTours = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/tours");
      setTours(res.data.data);
    } catch (err) {
      console.error("Erreur lors du fetch:", err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (editingId && editingId !== -1) {
        await axios.post(`http://127.0.0.1:8000/api/tours/${editingId}?_method=PUT`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://127.0.0.1:8000/api/tours", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({
        title: "",
        description: "",
        price: "",
        destination_id: "",
        categorie_id: "",
        nbr_jours: "",
        nbr_places: "",
        duration_date: "",
        image_url: "",
      });
      setEditingId(null);
      fetchTours();
    } catch (err) {
      console.error("Erreur soumission:", err);
    }
  };

  const handleEdit = (tour) => {
    setForm({
      title: tour.title || "",
      description: tour.description || "",
      price: tour.price || "",
      destination_id: tour.destination_id || "",
      categorie_id: tour.categorie_id || "",
      nbr_jours: tour.nbr_jours || "",
      nbr_places: tour.nbr_places || "",
      duration_date: tour.duration_date || "",
      image_url: "", // reset because file input can’t be prefilled
    });
    setEditingId(tour.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tours/${id}`);
      fetchTours();
    } catch (err) {
      console.error("Erreur suppression:", err);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTours = tours.filter((tour) =>
    tour.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5 bg-dark text-light p-4 rounded">
      <h1 className="text-center mb-4">Tour Management</h1>

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
          onClick={() => setEditingId(-1)}
        >
          <FaPlus className="d-inline" /> Add Tour
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
                <td>{t.nbr_jours} days</td>
                <td>{t.destination?.name || t.destination_id}</td>
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
                    className="btn btn-primary me-2 d-inline-flex items-center"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleEdit(t)}
                  >
                    <FaEdit className="me-1" /> Edit
                  </button>
                  <button
                    className="btn btn-danger d-inline-flex items-center"
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
        isOpen={!!editingId || editingId === -1}
        setIsOpen={() => setEditingId(null)}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        editingId={editingId}
      />
    </div>
  );
};

export default ToursList;
