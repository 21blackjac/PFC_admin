import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./components_css/AdminInfoCss.css";

const AdminInfo = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await axios.get("http://localhost:8050/Admin/display");
      const adminData = response.data[0]; // Assuming the first admin is the one to be edited
      setFormData({
        username: adminData.username,
        email: adminData.email,
        password: "",
      });
    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast.error("Failed to fetch admin data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8050/Admin/update", formData);
      toast.success("Admin information updated successfully");
      fetchAdminData(); // Refresh admin data after update
    } catch (error) {
      console.error("Error updating admin information:", error);
      toast.error("Failed to update admin information");
    }
  };

  return (
    <div
      className="admin-info-container"
      style={{
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <h2>Admin Information</h2>
      <div className="admin-info">
        <img
          src="/assets/avatar.svg"
          alt="Admin Profile"
          className="admin-profile-pic"
        />
        <form onSubmit={handleSubmit} className="admin-info-form">
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="update-button">
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminInfo;
