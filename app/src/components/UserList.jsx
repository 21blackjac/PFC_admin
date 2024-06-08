import { useState, useEffect } from "react";
import Modal from "react-modal";
import UserForm from "./ModalForms/UserForm";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

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
      const response = await axios.get("http://localhost:8050/Users/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const handleAddUser = async (user) => {
    try {
      const response = await axios.post(
        "http://localhost:8050/Users/addUser",
        user
      );
      setUsers([...users, { ...user, id: response.data.id }]);
      toast.success("User created successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error('Faild to add user')
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      const response = await axios.put(
        `http://localhost:8050/Users/updateUser/${user._id}`,
        user
      );
      if (response.status === 200) {
        setUsers(users.map((u) => (u._id === user._id ? user : u)));
        toast.success("User updated successfully!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error('Faild to update user')
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8050/Users/deleteUser/${userId}`
      );
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error('Faild to delete user')
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

  const handleFormSubmit = (user) => {
    if (isEdit) {
      handleUpdateUser(user);
    } else {
      handleAddUser(user);
    }
    handleCloseModal();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
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
          <FaPlus className="mr-2" /> Add User
        </button>
      </div>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Activity</th>
            <th>Status Membership</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.activity}</td>
              <td>{user.statusMembership}</td>
              <td>{formatDate(user.createdAt)}</td>
              <td>{formatDate(user.updatedAt)}</td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleOpenModal(user)}
                >
                  <FaEdit className="mr-1" /> Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user._id)}
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
      >
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title">
              {isEdit ? "Update User" : "Add User"}
            </h5>
            <button
              type="button"
              className="close text-light"
              onClick={handleCloseModal}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <UserForm
              initialData={currentUser}
              onSubmit={handleFormSubmit}
              isEdit={isEdit}
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default UserList;
