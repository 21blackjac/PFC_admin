import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import "./components_css/sideBarCss.css";

const SideBar = () => {
  const [adminInfo, setAdminInfo] = useState([]);

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const adminId = localStorage.getItem("adminId");
      console.log("Retrieved admin ID:", adminId);

      if (!adminId) {
        throw new Error("Admin ID not found");
      }

      const response = await axios.get(
        `http://localhost:8050/Admin/display/${adminId}`
      );
      setAdminInfo(response.data);
      console.log("Admin Info: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching admin:", error.message);
    }
  };

  const navigate = useNavigate();
  const logout = async () => {
  
    try {
      await axios.get("http://localhost:8050/Admin/logout");
      localStorage.removeItem("adminId"); // Remove admin ID on logout
  
      // Notify user of successful logout
      toast.success("Logged out successfully!");
  
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="body">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="header">
            <span className="icon logo" style={{height: "auto"}}>
              <img
                src="/assets/logo.jpeg"
                style={{ height: "60px", borderRadius: "50%" }}
              />
            </span>
            <span className="name">Espace Admin</span>
          </div>
          <menu className="side-nav">
            <ul>
              <li className="side-nav__item">
                <Link to={"/dashboard"}>
                  <div className="Dashboard">
                    <div>
                      <span className="icon">
                        <svg
                          width="18"
                          height="20"
                          viewBox="0 0 18 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.38606 0.918961C8.74717 0.638097 9.25283 0.638097 9.61394 0.918961L17.3014 6.89813C17.545 7.08758 17.6875 7.37889 17.6875 7.68748V17.0833C17.6875 17.8016 17.4022 18.4905 16.8942 18.9984C16.3863 19.5063 15.6975 19.7916 14.9792 19.7916H3.02083C2.30254 19.7916 1.61366 19.5063 1.10575 18.9984C0.597841 18.4905 0.3125 17.8016 0.3125 17.0833V7.68748C0.3125 7.37889 0.454973 7.08758 0.698559 6.89813L8.38606 0.918961ZM2.3125 8.17656V17.0833C2.3125 17.2712 2.38713 17.4513 2.51997 17.5842C2.6528 17.717 2.83297 17.7916 3.02083 17.7916H14.9792C15.167 17.7916 15.3472 17.717 15.48 17.5842C15.6129 17.4513 15.6875 17.2712 15.6875 17.0833V8.17656L9 2.97517L2.3125 8.17656ZM10 10.3353V16.826L15.3333 13.7783C15.3338 13.7781 15.3343 13.7778 15.3348 13.7775C15.4417 13.7154 15.5305 13.6264 15.5924 13.5194C15.6545 13.4125 15.6873 13.2928 15.6873 13.1725C15.6873 13.0521 15.6545 12.9325 15.5924 12.8256C15.5305 12.7187 15.4417 12.6297 15.3348 12.5675C15.2278 12.5053 15.1082 12.4725 14.9879 12.4725C14.8676 12.4725 14.748 12.5053 14.6411 12.5675C14.5342 12.6297 14.4452 12.7187 14.383 12.8256C14.3209 12.9325 14.288 13.0521 14.288 13.1725V13.3983L10 15.5433L5.712 13.3983V13.1725C5.712 13.0521 5.67916 12.9325 5.61731 12.8256C5.55547 12.7187 5.46669 12.6297 5.35982 12.5675C5.25295 12.5053 5.13329 12.4725 5.013 12.4725C4.89271 12.4725 4.77305 12.5053 4.66619 12.5675C4.55932 12.6297 4.47054 12.7187 4.4087 12.8256C4.34686 12.9325 4.31402 13.0521 4.31402 13.1725C4.31402 13.2928 4.34686 13.4125 4.4087 13.5194C4.47054 13.6264 4.55932 13.7154 4.66619 13.7775C4.77305 13.8396 4.89271 13.8724 5.013 13.8724C5.13329 13.8724 5.25295 13.8396 5.35982 13.7775C5.46669 13.7154 5.55547 13.6264 5.61731 13.5194C5.67916 13.4125 5.712 13.2928 5.712 13.1725V13.3983L10 15.5433L14.288 13.3983V13.1725C14.288 13.0521 14.3209 12.9325 14.383 12.8256C14.4452 12.7187 14.5342 12.6297 14.6411 12.5675C14.748 12.5053 14.8676 12.4725 14.9879 12.4725C15.1082 12.4725 15.2278 12.5053 15.3348 12.5675C15.4417 12.6297 15.5305 12.7187 15.5924 12.8256C15.6545 12.9325 15.6873 13.0521 15.6873 13.1725C15.6873 13.2928 15.6545 13.4125 15.5924 13.5194C15.5305 13.6264 15.4417 13.7154 15.3348 13.7775C15.3343 13.7778 15.3338 13.7781 15.3333 13.7783L10 16.826Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                    </div>
                    <div>
                      <span className="text">Dashboard</span>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="side-nav__item">
                <Link to={"/userlist"}>
                  <div className="Dashboard">
                    <div>
                      <span className="icon">
                        <img
                          src="/assets/usersListIcon.png"
                          style={{ height: "20px" }}
                        />
                      </span>
                    </div>
                    <div>
                      <span className="text">UsersList</span>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="side-nav__item">
                <Link to={"/ToursList"}>
                  <div className="Dashboard">
                    <div>
                      <span className="icon">
                        <img
                          src="/assets/paymentListIcon.png"
                          style={{ borderRadius: "50%" }}
                        />
                      </span>
                    </div>
                    <div>
                      <span className="text">ToursList</span>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="side-nav__item">
                <Link to={"/BookingsList"}>
                  <div className="Dashboard">
                    <div>
                      <span className="icon">
                        <img
                          src="/assets/bookingsListIcon.png"
                          style={{ borderRadius: "50%" }}
                        />
                      </span>
                    </div>
                    <div>
                      <span className="text">BookingsList</span>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="side-nav__item">
                <button type="submit" onClick={logout}>
                  <div className="Dashboard">
                    <div style={{ width: "22px" }}>
                      <span className="icon">
                        <img src="/assets/logoutIcon.png" />
                      </span>
                    </div>

                    <div>
                      <span
                        className="text"
                        style={{ color: "rgb(255, 217, 3)" }}
                      >
                        logout
                      </span>
                    </div>
                  </div>
                </button>
              </li>
            </ul>
          </menu>
        </div>
        <div className="sidebar-bottom">
          <Link to={"/admininfo"}>
            <figure className="profile">
              <img
                src="/assets/avatar.svg"
                alt="user profile image"
                className="profile-pic"
              />
              <figcaption className="profile-details">
                {adminInfo ? adminInfo.username : "Admin"}
              </figcaption>
            </figure>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
