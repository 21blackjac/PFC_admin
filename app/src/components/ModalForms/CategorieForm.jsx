import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CategorieForm = ({ initialData, onSubmit, isEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    description: "",
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, imageUrl: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          className="form-control"
          id="image"
          name="image"
          onChange={handleFileChange}
          required={!isEdit}
        />
      </div>
      {formData.imageUrl && (
        <div className="form-group">
          <img src={formData.imageUrl} alt="Preview" className="img-thumbnail" />
        </div>
      )}
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
          {isEdit ? "Update Category" : "Add Category"}
        </button>
      </div>
    </form>
  );
};

export default CategorieForm;
