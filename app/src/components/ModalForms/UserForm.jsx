import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UserForm = ({ initialData, onSubmit, isEdit, onCancel }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onCancel(false)
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label className="label font-semibold">Full Name:</label>
          <input
            type="text"
            name="Name"
            className="input input-ghosted w-full"
            value={formData.Name}
            onChange={handleChange}
            placeholder="Enter Your Full Name"
            required
          />
        </div>
        <div className="form-group">
          <label className="label font-semibold">Email:</label>
          <input
            type="mail"
            name="Email"
            className="input input-ghosted w-full"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div className="form-group">
          <label className="label font-semibold">Password</label>
          <input
            type="password"
            name="Password"
            className="input input-ghosted w-full"
            value={formData.Password}
            onChange={handleChange}
            placeholder="Enter Your Password"
            required
          />
        </div>
        <div className="button-group text-right d-flex justify-around mt-10">
          <button type="submit" className="btn btn-primary">
            {isEdit ? "Update User" : "Add User"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
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
