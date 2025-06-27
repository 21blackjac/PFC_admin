import { useState, useEffect } from "react";
import Modal from "react-modal";
import UserForm from "./ModalForms/UserForm";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // ou "Unknown", ou "" selon ton besoin

    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date";

    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const handleAddUser = async (user) => {
    try {
      const payload = {
        name: user.name,
        email: user.email,
        password: user.password,
        password_confirmation: user.password_confirmation,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/addUser",
        payload
      );

      setUsers([...users, response.data.user]);
    } catch (error) {
      console.error("Error adding user:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add user");
      }
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/users/${user.id}`,
        user
      );
      if (response.status === 200) {
        setUsers(users.map((u) => (u.id === user.id ? user : u)));
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/users/${userId}`
      );
      if (response.status === 200) {
        setUsers(users.filter((user) => user.id !== userId));
        toast.success("User deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleOpenModal = (user = null) => {
    setCurrentUser(user);
    setIsEdit(!!user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    setIsEdit(false);
  };

  const handleFormSubmit = async (user) => {
    if (isEdit) {
      await handleUpdateUser(user);
    } else {
      await handleAddUser(user);
    }
    handleCloseModal();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5 bg-dark text-light p-4 rounded">
      <h1 className="my-4 text-center">Users List</h1>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: "auto" }}
        />
        <button className="btn btn-success" onClick={() => handleOpenModal()}>
          <FaPlus className="d-inline" /> Add User
        </button>
      </div>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{formatDate(user.created_at)}</td>
              <td>{formatDate(user.updated_at)}</td>
              <td>
                <button
                  className="btn btn-primary d-inline-flex items-center mr-2"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleOpenModal(user)}
                >
                  <FaEdit className="mr-1" /> Update
                </button>
                <button
                  className="btn btn-danger d-inline-flex items-center"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="User Modal"
        style={{
          content: {
            width: "40%",
            margin: "auto",
            borderRadius: "10px",
            padding: "2rem",
          },
        }}
      >
        <div className="relative">
          <div className="modal-header">
            <h5 className="text-2xl font-bold text-blue-600 text-center mb-4">
              {isEdit ? "Update User" : "Add User"}
            </h5>
            <button
              type="button"
              className="close text-dark"
              onClick={handleCloseModal}
            >
              <span>&times;</span>
            </button>
          </div>
          <UserForm
            initialData={currentUser}
            onSubmit={handleFormSubmit}
            isEdit={isEdit}
            onCancel={handleCloseModal}
          />
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default UserList;
