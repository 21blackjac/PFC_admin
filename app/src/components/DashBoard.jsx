import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaMoneyBill, FaList } from "react-icons/fa";
import "./components_css/DashboardCss.css";

const DashBoard = () => {
  const [userCount, setUserCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryData = async () => {
    try {
      const [usersRes, paymentsRes, categoriesRes, adminListRes] =
        await Promise.all([
          axios.get("http://localhost:8050/Users/usersCount"),
          axios.get("http://localhost:8050/Payment/paymentsCount"),
          axios.get("http://localhost:8050/Categorie/categoriesCount"),
          axios.get("http://localhost:8050/Admin/display"),
        ]);

      setAdminList(adminListRes.data);
      setUserCount(usersRes.data.count);
      setPaymentCount(paymentsRes.data.count);
      setCategoryCount(categoriesRes.data.count);
      console.log("Admin List Response:", adminListRes.data);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <FaUsers className="card-icon" />
          <div className="card-info">
            <h2>{userCount}</h2>
            <p>Total Users</p>
          </div>
        </div>
        <div className="dashboard-card">
          <FaMoneyBill className="card-icon" />
          <div className="card-info">
            <h2>{paymentCount}</h2>
            <p>Total Payments</p>
          </div>
        </div>
        <div className="dashboard-card">
          <FaList className="card-icon" />
          <div className="card-info">
            <h2>{categoryCount}</h2>
            <p>Total Categories</p>
          </div>
        </div>
      </div>
      <div className="dashboard-section">
        <h2>Admins List</h2>
        <div className="admin-list">
          {
            adminList.map((admin) => (
              <div key={admin._id} className="admin-item">
                <img
                  src="/assets/avatar.svg"
                  alt="user profile image"
                  className="admin-profile-picture"
                />
                <div className="admin-info">
                  <p>Username: {admin.username}</p>
                  <p>Email: {admin.email}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>  );
};

export default DashBoard;
