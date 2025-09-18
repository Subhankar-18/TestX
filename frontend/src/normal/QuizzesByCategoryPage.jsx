// src/normal/QuizzesByCategoryPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const QuizzesByCategoryPage = () => {
    const { cid } = useParams();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const fetchQuizzes = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/quiz/category/active/${cid}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setQuizzes(response.data);
        } catch (err) {
            setError('Failed to fetch quizzes for this category.');
        } finally {
            setLoading(false);
        }
    }, [cid, token]);

    useEffect(() => {
        fetchQuizzes();
    }, [fetchQuizzes]);

    if (loading) return <h3>Loading quizzes...</h3>;
    if (error) return <h3 className="text-danger">Error: {error}</h3>;
    if (quizzes.length === 0) return <h3>No active quizzes found for this category.</h3>;

    return (
        <div className="normal-container">
            <h2>Quizzes</h2>
            <div className="quiz-list">
                {quizzes.map(quiz => (
                    <Link to={`/normal/quiz/${quiz.qid}`} key={quiz.qid} className="quiz-card">
                        <h3>{quiz.title}</h3>
                        <p>{quiz.description}</p>
                        <p>Questions: {quiz.numberOfQuestions} | Max Marks: {quiz.maxMarks}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default QuizzesByCategoryPage;