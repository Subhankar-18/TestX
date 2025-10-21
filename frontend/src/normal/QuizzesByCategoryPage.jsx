import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Normalpage.css';
import { BiBook, BiSad } from 'react-icons/bi';

const QuizzesByCategoryPage = () => {
    const { cid } = useParams();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    const fetchQuizzes = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/quiz/category/active/${cid}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            setQuizzes(response.data);
        } catch (err) {
            setError('Failed to fetch quizzes for this category.');
        } finally {
            setLoading(false);
        }
    }, [cid, token]);

    useEffect(() => { fetchQuizzes(); }, [fetchQuizzes]);

    if (loading) return <h3>Loading quizzes...</h3>;
    if (error) return <h3 className="text-danger">Error: {error}</h3>;

    return (
        <div className="normal-container">
            <div className="content flex-grow-1 p-4">
                <h2 className="mb-4">Quizzes</h2>

                {quizzes.length === 0 ? (
                    <div className="empty-state text-center p-5">
                        <BiSad size={60} color="#3cb371" />
                        <h3 className="mt-3">No quizzes available</h3>
                        <p className="text-muted">
                            There are currently no active quizzes in this category.
                        </p>
                        <Link to="/normalpage" className="btn btn-outline-primary mt-3">
                            Browse Other Categories
                        </Link>
                    </div>
                ) : (
                    <div className="quiz-list">
                        {quizzes.map(quiz => (
                            <Link 
                              to={`/normal/quiz/${quiz.qid}`} 
                              key={quiz.qid} 
                              className="quiz-card"
                            >
                                <BiBook className="quiz-icon"/>
                                <h3>{quiz.title}</h3>
                                <p>{quiz.description}</p>
                                <p>Questions: {quiz.numberOfQuestions} | Max Marks: {quiz.maxMarks}</p>
                                <button className="btn btn-outline-primary">Start Quiz</button>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizzesByCategoryPage;
