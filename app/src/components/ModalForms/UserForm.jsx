import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserForm = ({ initialData, onSubmit, isEdit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    activity: '',
    statusMembership: '',
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
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="activity">Activity:</label>
        <input
          type="text"
          className="form-control"
          id="activity"
          name="activity"
          value={formData.activity}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="statusMembership">Status Membership:</label>
        <input
          type="text"
          className="form-control"
          id="statusMembership"
          name="statusMembership"
          value={formData.statusMembership}
          onChange={handleChange}
          required
        />
      </div>
      <div className="button-group text-right">
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Update User' : 'Add User'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
