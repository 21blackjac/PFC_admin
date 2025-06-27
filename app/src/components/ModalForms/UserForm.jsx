import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

const UserForm = ({ initialData, onSubmit, isEdit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        password: "",
        password_confirmation: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validation centralisée
    if (!formData.name || !formData.email) {
      setError("Name and Email cannot be empty.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.password || !formData.password_confirmation) {
      setError("Password and Confirm Password cannot be empty.");
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(""); // Clear any previous error

    if (onSubmit) onSubmit(formData);
    else console.error("onSubmit function is not provided");

    toast.success(isEdit ? "User updated successfully!" : "User added successfully!");

    if (!isEdit) {
      setFormData({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    }

    if (onCancel) onCancel(false);
    else console.error("onCancel function is not provided");
  };

  const handleCancel = () => {
    if (onCancel) onCancel(false);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="user-form space-y-4">
        {/* ✅ Error display */}
        {error && (
          <div className="alert alert-warning shadow-sm mb-4">{error}</div>
        )}

        <div className="form-group">
          <label className="label font-semibold">Full Name:</label>
          <input
            type="text"
            name="name"
            className="input input-bordered w-full"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label font-semibold">Password:</label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="label font-semibold">Confirm Password:</label>
          <input
            type="password"
            name="password_confirmation"
            className="input input-bordered w-full"
            placeholder="Confirm password"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-between mt-5">
          <button type="submit" className="btn btn-primary w-full mr-2">
            {isEdit ? "Update User" : "Add User"}
          </button>
          <button
            type="button"
            className="btn btn-ghost w-full ml-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
