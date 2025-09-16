import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
        quiz: { qid: null }
    });
    const [editingQuestion, setEditingQuestion] = useState(null);
    const token = localStorage.getItem('token');

    // Fetch all quizzes
    const fetchQuizzes = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/quiz/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setQuizzes(response.data);
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
            alert('Failed to fetch quizzes. Check server connection and authorization.');
        }
    }, [token]);

    // Fetch questions for the selected quiz
    const fetchQuestions = useCallback(async () => {
        if (!qid) return;
        try {
            const response = await axios.get(`http://localhost:8080/question/quiz/all/${qid}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setQuestions(response.data);
            setNewQuestion(prev => ({ ...prev, quiz: { qid: qid } }));
        } catch (error) {
            console.error('Failed to fetch questions:', error);
            alert('Failed to fetch questions. Check the quiz ID and server connection.');
        }
    }, [qid, token]);

    useEffect(() => {
        fetchQuizzes();
        fetchQuestions();
    }, [fetchQuizzes, fetchQuestions]);

    // Handle form input changes for new or editing question
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingQuestion) {
            setEditingQuestion(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setNewQuestion(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // Handle adding a new question
    const handleAddQuestion = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/question/', newQuestion, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert('Question added successfully!');
            fetchQuestions(); // Refresh the question list
            // Clear the form
            setNewQuestion({
                content: '', option1: '', option2: '', option3: '', option4: '', answer: '', quiz: { qid: qid }
            });
        } catch (error) {
            console.error('Failed to add question:', error);
            alert('Failed to add question.');
        }
    };

    // Handle updating an existing question
    const handleUpdateQuestion = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:8080/question/', editingQuestion, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert('Question updated successfully!');
            fetchQuestions();
            setEditingQuestion(null); // Exit edit mode
        } catch (error) {
            console.error('Failed to update question:', error);
            alert('Failed to update question.');
        }
    };

    return (
        <div>
            <h2>Question Management</h2>
            
            {/* Quiz Selection Section */}
            <div>
                <h3>Select a Quiz</h3>
                <ul>
                    {quizzes.map(quiz => (
                        <li key={quiz.qid} style={{cursor: 'pointer', marginBottom: '10px'}}>
                            <a href={`/questions/${quiz.qid}`}>{quiz.title}</a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Check if a quiz is selected (from URL) */}
            {qid && (
                <>
                    {/* Add New/Update Question Form */}
                    <hr/>
                    <h3>
                        {editingQuestion ? 'Update Question' : `Add New Question to Quiz: ${quizzes.find(q => q.qid == qid)?.title}`}
                    </h3>
                    <form onSubmit={editingQuestion ? handleUpdateQuestion : handleAddQuestion}>
                        <div>
                            <label>Question Content:</label>
                            <textarea name="content" value={editingQuestion ? editingQuestion.content : newQuestion.content} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <label>Option 1:</label>
                            <input type="text" name="option1" value={editingQuestion ? editingQuestion.option1 : newQuestion.option1} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <label>Option 2:</label>
                            <input type="text" name="option2" value={editingQuestion ? editingQuestion.option2 : newQuestion.option2} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <label>Option 3:</label>
                            <input type="text" name="option3" value={editingQuestion ? editingQuestion.option3 : newQuestion.option3} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Option 4:</label>
                            <input type="text" name="option4" value={editingQuestion ? editingQuestion.option4 : newQuestion.option4} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>Correct Answer:</label>
                            <input type="text" name="answer" value={editingQuestion ? editingQuestion.answer : newQuestion.answer} onChange={handleInputChange} required />
                        </div>
                        <button type="submit">{editingQuestion ? 'Update Question' : 'Add Question'}</button>
                        {editingQuestion && <button type="button" onClick={() => setEditingQuestion(null)}>Cancel</button>}
                    </form>

                    {/* See Questions Section */}
                    <hr/>
                    <h3>Questions for Quiz: {quizzes.find(q => q.qid == qid)?.title}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Content</th>
                                <th>Answer</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map(q => (
                                <tr key={q.quesId}>
                                    <td>{q.quesId}</td>
                                    <td>{q.content}</td>
                                    <td>{q.answer}</td>
                                    <td>
                                        <button onClick={() => setEditingQuestion(q)}>Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default QuestionPage;