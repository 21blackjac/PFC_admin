import { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaMoneyBill, FaList } from "react-icons/fa";
import "./components_css/DashboardCss.css";

const DashBoard = () => {
  const [userCount, setUserCount] = useState(0);
  const [tourCount, setTourCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0); // ✅ new
  const [adminList, setAdminList] = useState([]);

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryData = async () => {
    try {
      const userResponse = await axios.get(
        "http://localhost:8050/Users/usersCount"
      );
      const tourResponse = await axios.get(
        "http://localhost:8050/Tours/toursCount"
      );
      const bookingResponse = await axios.get(
        "http://localhost:8050/Bookings/bookingsCount"
      ); // ✅ new
      const adminResponse = await axios.get(
        "http://localhost:8050/Admin/adminsList"
      );

      setUserCount(userResponse.data.count);
      setTourCount(tourResponse.data.count);
      setBookingCount(bookingResponse.data.count); // ✅ new
      setAdminList(adminResponse.data);
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
            <h2>{tourCount}</h2>
            <p>Total Tours</p>
          </div>
        </div>
        <div className="dashboard-card">
          <FaList className="card-icon" />
          <div className="card-info">
            <h2>{bookingCount}</h2>
            <p>Total Bookings</p>
          </div>
        </div>
      </div>
      <div className="dashboard-section">
        <h2>Admins List</h2>
        <div className="admin-list">
          {adminList.map((admin) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
