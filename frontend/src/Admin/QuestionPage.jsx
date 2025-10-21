import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './QuestionPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const QuestionPage = () => {
  const { qid } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: { qid: null },
  });
  const [editingQuestion, setEditingQuestion] = useState(null);
  const token = localStorage.getItem('token');

  // Fetch all quizzes
  const fetchQuizzes = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/quiz/`, {//
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch quizzes.');
    }
  }, [token]);

  // Fetch questions for selected quiz
  const fetchQuestions = useCallback(async () => {
    if (!qid) return;
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/question/quiz/all/${qid}`, {//
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(response.data);
      setNewQuestion(prev => ({ ...prev, quiz: { qid } }));
    } catch (error) {
      console.error(error);
      alert('Failed to fetch questions.');
    }
  }, [qid, token]);

  useEffect(() => {
    fetchQuizzes();
    fetchQuestions();
  }, [fetchQuizzes, fetchQuestions]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (editingQuestion) {
      setEditingQuestion(prev => ({ ...prev, [name]: value }));
    } else {
      setNewQuestion(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddQuestion = async e => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/question/`, newQuestion, {//
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Question added successfully!');
      fetchQuestions();
      setNewQuestion({ content: '', option1: '', option2: '', option3: '', option4: '', answer: '', quiz: { qid } });
    } catch (error) {
      console.error(error);
      alert('Failed to add question.');
    }
  };

  const handleUpdateQuestion = async e => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/question/`, editingQuestion, {//
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Question updated successfully!');
      fetchQuestions();
      setEditingQuestion(null);
    } catch (error) {
      console.error(error);
      alert('Failed to update question.');
    }
  };

  const handleDeleteQuestion = async quesId => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/question/${quesId}`, {//
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Question deleted successfully!');
      fetchQuestions();
    } catch (error) {
      console.error(error);
      alert('Failed to delete question.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/signin';
  };

  return (
    <div className="admin-container d-flex">        
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
            <a href="/quiz" className="nav-link">
              <i className="bi bi-pencil-square me-2"></i> Quiz
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/questions" className="nav-link active">
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

     
      {/* Main Content */}
      <div className="content flex-grow-1 p-4">       
        <h1 className="main-heading">Questions</h1>

        {/* Quiz Cards */}
        <div className="section-container">
          <h2 className="section-heading">Select a Quiz</h2>
          <div className="quiz-cards-container">
            {quizzes.map(quiz => (
              <Link key={quiz.qid} to={`/questions/${quiz.qid}`} className="quiz-card">
                <h3 className="quiz-card-title">{quiz.title}</h3>
                <p className="quiz-card-info">Questions: {quiz.numberOfQuestions}</p>
                <p className="quiz-card-info">Category: {quiz.category.title}</p>
              </Link>
            ))}
          </div>
        </div>

        {qid && (
          <>
{/* Add/Edit Question Form */}
<div className="section-container">
  <h2 className="section-heading">
    {editingQuestion
      ? 'Update Question'
      : `Add Question for ${quizzes.find(q => q.qid == qid)?.title}`}
  </h2>

  <form
    onSubmit={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
    className="question-form"
  >
    {/* Question Content */}
    <div className="form-group">
      <label>Question</label>
      <textarea
        name="content"
        value={editingQuestion ? editingQuestion.content : newQuestion.content}
        onChange={handleInputChange}
        required
        placeholder="Type your question here..."
      />
    </div>

    {/* Options grouped in a row */}
    <div className="options-row">
      <div className="form-group">
        <label>Option 1</label>
        <input
          type="text"
          name="option1"
          value={editingQuestion ? editingQuestion.option1 : newQuestion.option1}
          onChange={handleInputChange}
          required
          placeholder="Option 1"
        />
      </div>
      <div className="form-group">
        <label>Option 2</label>
        <input
          type="text"
          name="option2"
          value={editingQuestion ? editingQuestion.option2 : newQuestion.option2}
          onChange={handleInputChange}
          required
          placeholder="Option 2"
        />
      </div>
      <div className="form-group">
        <label>Option 3</label>
        <input
          type="text"
          name="option3"
          value={editingQuestion ? editingQuestion.option3 : newQuestion.option3}
          onChange={handleInputChange}
          placeholder="Option 3"
        />
      </div>
      <div className="form-group">
        <label>Option 4</label>
        <input
          type="text"
          name="option4"
          value={editingQuestion ? editingQuestion.option4 : newQuestion.option4}
          onChange={handleInputChange}
          placeholder="Option 4"
        />
      </div>
    </div>

    {/* Correct Answer */}
    <div className="form-group">
      <label>Correct Answer</label>
      <input
        type="text"
        name="answer"
        value={editingQuestion ? editingQuestion.answer : newQuestion.answer}
        onChange={handleInputChange}
        required
        placeholder="Correct Answer"
      />
    </div>

    {/* Action Buttons */}
    <div className="form-actions">
      <button type="submit" className="btn btn-primary">
        {editingQuestion ? 'Update Question' : 'Add Question'}
      </button>
      {editingQuestion && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setEditingQuestion(null)}
        >
          Cancel
        </button>
      )}
    </div>
  </form>
</div>
            {/* Questions List */}
            <div className="section-container">
              <h2 className="section-heading">Questions</h2>
              <div className="questions-list">
                {questions.map(q => (
                  <div key={q.quesId} className="question-card">
                    <h4 className="question-content">{q.content}</h4>
                    <p className="question-answer">Answer: {q.answer}</p>
                    <div className="question-options">
                      {[q.option1, q.option2, q.option3, q.option4].map(
                        (opt, idx) => opt && <p key={idx}>{opt}</p>
                      )}
                    </div>
                    <div className="question-actions">
                      <button onClick={() => setEditingQuestion(q)} className="btn btn-update btn-icon">
                        <FontAwesomeIcon icon={faEdit} /> Update
                      </button>
                      <button onClick={() => handleDeleteQuestion(q.quesId)} className="btn btn-delete btn-icon">
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
