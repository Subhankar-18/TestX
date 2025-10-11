import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Category.css";
import {
  BsCodeSlash,
  BsFillPieChartFill,
  BsTranslate,
  BsQuestionCircleFill,
  BsBookFill,
  BsLightbulbFill,
} from "react-icons/bs";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const categoryIcons = {
  "Programming Language": BsCodeSlash,
  Quant: BsFillPieChartFill,
  "General Knowledge": BsBookFill,
  Mathematics: BsLightbulbFill,
  "Languages": BsTranslate,
};

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ title: "", description: "" });
  const [editingCategory, setEditingCategory] = useState(null);
  const token = localStorage.getItem("token");

  // fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8080/category/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      setError("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      window.location.href = "/signin";
      return;
    }
    fetchCategories();
  }, [token, fetchCategories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setNewCategory({ title: category.title, description: category.description, cid: category.cid });
    } else {
      setEditingCategory(null);
      setNewCategory({ title: "", description: "" });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setNewCategory({ title: "", description: "" });
  };


  const handleAddOrUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await axios.put("http://localhost:8080/category/", newCategory, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Category updated!");
      } else {
        await axios.post("http://localhost:8080/category/", newCategory, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Category added!");
      }
      handleCloseModal();
      fetchCategories();
    } catch (err) {
      toast.error("Failed to save category.");
    }
  };

  const handleDeleteCategory = async (cid) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:8080/category/${cid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Category deleted!");
        fetchCategories();
      } catch (err) {
        toast.error("Failed to delete category.");
      }
    }
  };

  if (loading) return <h3>Loading categories...</h3>;
  if (error) return <h3 className="text-danger">Error: {error}</h3>;

  return (
    <div className="admin-container d-flex">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <div className="sidebar p-3">
        <ul className="nav flex-column mt-2">
          <li className="nav-item mb-2">
            <a href="/adminpage" className="nav-link">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/category" className="nav-link active">
              <i className="bi bi-tags me-2"></i> Category
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/quiz" className="nav-link">
              <i className="bi bi-pencil-square me-2"></i> Quiz
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/questions" className="nav-link">
              <i className="bi bi-question-circle me-2"></i> Questions
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/adminprofile" className="nav-link">
              <i className="bi bi-person-circle me-2"></i> Profile
            </a>
          </li>
          <li className="nav-item mt-3">
            <button
              className="btn btn-outline-light w-100"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/signin";
              }}
            >
              <i className="bi bi-box-arrow-right me-2"></i> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="content flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 ">
          <h2>Categories</h2>
          <button className="btn btn-primary btn-lg d-flex align-items-center" onClick={() => handleOpenModal()}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <span>Add Category</span>
          </button>
        </div>


        <div className="row">
          {categories.map((category) => {
            const Icon = categoryIcons[category.title] || BsQuestionCircleFill;
            return (
              <div key={category.cid} className="col-md-3 mb-4">
                <div className="card shadow-sm text-center">
                  <div className="card-body">
                    <div className="mb-2">
                      <Icon size={30} />
                    </div>
                    <h5 className="fw-bold">{category.title}</h5>
                    <p className="text-muted">{category.description}</p>
                  </div>
                  <div className="card-footer d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm btn-outline-info"
                      onClick={() => handleOpenModal(category)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteCategory(category.cid)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-header">
              <h5>{editingCategory ? "Update Category" : "Add Category"}</h5>
              <button className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <form onSubmit={handleAddOrUpdateCategory} className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={newCategory.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={newCategory.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCategory ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;