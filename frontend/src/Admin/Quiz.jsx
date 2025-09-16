import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Quiz.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    description: "",
    maxMarks: "",
    numberOfQuestions: "",
    category: { cid: "" },
    active: false,
  });
  const [editingQuiz, setEditingQuiz] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch quizzes
  const fetchQuizzes = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8080/quiz/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(res.data);
    } catch (err) {
      setError("Failed to fetch quizzes.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch categories for filter & select
  const fetchCategories = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8080/category/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to fetch categories.");
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      window.location.href = "/signin";
      return;
    }
    fetchQuizzes();
    fetchCategories();
  }, [token, fetchQuizzes, fetchCategories]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "category") {
      setNewQuiz({ ...newQuiz, category: { cid: value } });
    } else if (type === "checkbox") {
      setNewQuiz({ ...newQuiz, [name]: checked });
    } else {
      setNewQuiz({ ...newQuiz, [name]: value });
    }
  };

  const handleOpenModal = (quiz = null) => {
    if (quiz) {
      setEditingQuiz(quiz);
      setNewQuiz({
        title: quiz.title,
        description: quiz.description,
        maxMarks: quiz.maxMarks,
        numberOfQuestions: quiz.numberOfQuestions,
        category: { cid: quiz.category.cid },
        qid: quiz.qid,
        active: quiz.active,
      });
    } else {
      setEditingQuiz(null);
      setNewQuiz({
        title: "",
        description: "",
        maxMarks: "",
        numberOfQuestions: "",
        category: { cid: "" },
        active: false,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingQuiz(null);
    setNewQuiz({
      title: "",
      description: "",
      maxMarks: "",
      numberOfQuestions: "",
      category: { cid: "" },
      active: false,
    });
  };

  const handleAddOrUpdateQuiz = async (e) => {
    e.preventDefault();
    try {
      if (editingQuiz) {
        await axios.put("http://localhost:8080/quiz/", newQuiz, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Quiz updated!");
      } else {
        await axios.post("http://localhost:8080/quiz/", newQuiz, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Quiz added!");
      }
      handleCloseModal();
      fetchQuizzes();
    } catch (err) {
      toast.error("Failed to save quiz.");
    }
  };

  const handleDeleteQuiz = async (qid) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:8080/quiz/${qid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Quiz deleted!");
        fetchQuizzes();
      } catch (err) {
        toast.error("Failed to delete quiz.");
      }
    }
  };

  const handleToggleActiveStatus = async (quiz) => {
    const updatedQuiz = { ...quiz, active: !quiz.active };
    try {
      await axios.put("http://localhost:8080/quiz/", updatedQuiz, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(updatedQuiz.active ? "Quiz published!" : "Quiz unpublished!");
      fetchQuizzes();
    } catch (err) {
      toast.error("Failed to update quiz status.");
    }
  };

  const handleCategoryFilter = async (cid) => {
    try {
      if (cid === "") {
        fetchQuizzes();
        return;
      }
      const res = await axios.get(`http://localhost:8080/quiz/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filtered = res.data.filter((q) => q.category.cid === parseInt(cid));
      setQuizzes(filtered);
    } catch (err) {
      toast.error("Failed to filter quizzes.");
    }
  };

  if (loading) return <h3>Loading quizzes...</h3>;
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
            <a href="/category" className="nav-link">
              <i className="bi bi-tags me-2"></i> Category
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/quiz" className="nav-link active">
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
              className="btn btn-outline-light w-100 d-flex align-items-center justify-content-start"
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Quizzes</h2>
          <button className="btn btn-primary btn-lg d-flex align-items-center" onClick={() => handleOpenModal()}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <span>Add Quiz</span>
          </button>
        </div>

        {/* Category filter */}
        <div className="mb-3">
          <select className="form-select w-25" onChange={(e) => handleCategoryFilter(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.cid} value={cat.cid}>{cat.title}</option>
            ))}
          </select>
        </div>

        {/* Quiz cards */}
        <div className="row">
          {quizzes.map((quiz) => (
            <div key={quiz.qid} className="col-md-3 mb-4">
              <div className="card shadow-sm text-center text-decoration-none text-dark">
                <Link to={`/questions/${quiz.qid}`} className="card-body">
                  <h5 className="fw-bold">{quiz.title}</h5>
                  <p className="text-muted">{quiz.description}</p>
                  <p className="text-muted">Marks: {quiz.maxMarks} | Questions: {quiz.numberOfQuestions}</p>
                  <p className="text-muted">Category: {quiz.category.title}</p>
                </Link>
                <div className="card-footer d-flex justify-content-center gap-2">
                  <button className="btn btn-sm btn-outline-info" onClick={() => handleOpenModal(quiz)}>
                    <FontAwesomeIcon icon={faEdit} /> Update
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteQuiz(quiz.qid)}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                  </button>
                  <button
                    className={`btn btn-sm ${quiz.active ? "btn-outline-warning" : "btn-outline-success"}`}
                    onClick={() => handleToggleActiveStatus(quiz)}
                  >
                    <FontAwesomeIcon icon={quiz.active ? faTimes : faCheck} className="me-1" />
                    {quiz.active ? "Unpublish" : "Publish"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-header">
              <h5>{editingQuiz ? "Update Quiz" : "Add Quiz"}</h5>
              <button className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <form onSubmit={handleAddOrUpdateQuiz} className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" name="title" value={newQuiz.title} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" name="description" value={newQuiz.description} onChange={handleInputChange} required></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Max Marks</label>
                <input type="number" className="form-control" name="maxMarks" value={newQuiz.maxMarks} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Number of Questions</label>
                <input type="number" className="form-control" name="numberOfQuestions" value={newQuiz.numberOfQuestions} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select className="form-select" name="category" value={newQuiz.category.cid} onChange={handleInputChange} required>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.cid} value={cat.cid}>{cat.title}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="activeCheck" name="active" checked={newQuiz.active} onChange={handleInputChange} />
                <label className="form-check-label" htmlFor="activeCheck">Active</label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingQuiz ? "Update" : "Add"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;