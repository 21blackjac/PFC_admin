import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentForm = ({ initialData, onSubmit, isEdit }) => {
  const [formData, setFormData] = useState({
    duration: '',
    price: '',
    description: '',
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
        <label htmlFor="duration">Duration:</label>
        <input
          type="text"
          className="form-control"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          className="form-control"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="button-group text-right">
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Update payment' : 'Add payment'}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;