import { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaPlane, FaBook } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./components_css/DashboardCss.css";

const DashBoard = () => {
  const [userCount, setUserCount] = useState(0);
  const [tourCount, setTourCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [revenueData, setRevenueData] = useState([]);

  const API_BASE = "http://localhost:8000/api";

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryData = async () => {
    try {
      const [userRes, tourRes, bookingRes, revenueRes] = await Promise.all([
        axios.get(`${API_BASE}/users/usersCount`),
        axios.get(`${API_BASE}/tours/toursCount`),
        axios.get(`${API_BASE}/reservations/bookingsCount`),
        axios.get(`${API_BASE}/reservations/monthly-revenue`), // 🆕
      ]);

      setUserCount(userRes.data.count);
      setTourCount(tourRes.data.count);
      setBookingCount(bookingRes.data.count);
      setRevenueData(revenueRes.data); // 🆕
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
          <FaPlane className="card-icon" />
          <div className="card-info">
            <h2>{tourCount}</h2>
            <p>Total Tours</p>
          </div>
        </div>
        <div className="dashboard-card">
          <FaBook className="card-icon" />
          <div className="card-info">
            <h2>{bookingCount}</h2>
            <p>Total Bookings</p>
          </div>
        </div>
      </div>
      <div className="dashboard-section mt-6">
        <h2>💰 Monthly Revenue</h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={revenueData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#4ade80"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
