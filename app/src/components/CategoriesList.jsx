import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import CategorieForm from "./ModalForms/CategorieForm";
import { ToastContainer, toast } from 'react-toastify';
import "./components_css/CategorieCss.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8050/Categorie/Categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async (category) => {
    try {
      const response = await axios.post("http://localhost:8050/Categorie/addCategorie", category);
      setCategories([...categories, { ...category, _id: response.data._id }]);
      toast.success("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category.");
    }
  };

  const handleUpdateCategory = async (category) => {
    try {
      const response = await axios.put(`http://localhost:8050/Categorie/updateCategorie/${category._id}`, category);
      if (response.status === 200) {
        setCategories(categories.map((u) => (u._id === category._id ? category : u)));
        toast.success("Category updated successfully!");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete(`http://localhost:8050/Categorie/deleteCategorie/${categoryId}`);
      if (response.status === 200) {
        setCategories(categories.filter((category) => category._id !== categoryId));
        toast.success("Category deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category.");
    }
  };

  const handleOpenModal = (category = null) => {
    setCurrentCategory(category);
    setIsEdit(!!category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
    setIsEdit(false);
  };

  const handleFormSubmit = (category) => {
    if (isEdit) {
      handleUpdateCategory(category);
    } else {
      handleAddCategory(category);
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto mt-5">
      <div style={{ display: 'flex', justifyContent: 'center', color: 'white' }}>
        <h1>Category List</h1>
      </div>
      <div className="row mt-3">
        {categories.map((category) => (
          <div key={category._id} className="col-md-4 mb-3">
            <div className="cards__inner responsive-card">
              <div className="cards__card card">
                <p className="card__heading">{category.name}</p>
                <img src={category.imageUrl} alt={category.name} className="card__image" />
                <p className="card__description">{category.description}</p>
                <div className="card__actions">
                  <button onClick={() => handleOpenModal(category)}><FaEdit style={{color: 'blue'}} /></button>
                  <button onClick={() => handleDeleteCategory(category._id)}><FaTrash /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{background: 'green', border: 0, height: '3rem'}}><FaPlus /> Add Category</button>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <CategorieForm initialData={currentCategory} onSubmit={handleFormSubmit} isEdit={isEdit} />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default CategoryList;
