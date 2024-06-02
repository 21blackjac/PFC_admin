import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashBoard from "./components/DashBoard";
import UserList from "./components/UserList";
import CategoriesList from "./components/CategoriesList";
import PaymentList from "./components/PaymentList";
import AdminInfo from "./components/AdminInfo";
import SideBar from "./components/SideBar";
import "./components/components_css/userListCss.css";

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div
        style={{
          padding: "2rem",
          width: "100%",
          overflowY: "auto",
          height: "100vh",
          backgroundColor: "#22262b",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div id="root">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <DashBoard />
              </Layout>
            }
          />
          <Route
            path="/userlist"
            element={
              <Layout>
                <UserList />
              </Layout>
            }
          />
          <Route
            path="/categorieslist"
            element={
              <Layout>
                <CategoriesList />
              </Layout>
            }
          />
          <Route
            path="/paymentlist"
            element={
              <Layout>
                <PaymentList />
              </Layout>
            }
          />
          <Route
            path="/admininfo"
            element={
              <Layout>
                <AdminInfo />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
