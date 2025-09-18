// src/normal/QuizTakingPage.jsx

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const QuizTakingPage = () => {
  const { qid } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({}); // keys are string quesKey
  const [quizDetails, setQuizDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch quiz + questions
  const fetchQuizAndQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const quizResponse = await axios.get(`http://localhost:8080/quiz/${qid}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizDetails(quizResponse.data);

      const questionsResponse = await axios.get(
        `http://localhost:8080/question/quiz/${qid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuestions(questionsResponse.data || []);
      console.log("Fetched questions:", questionsResponse.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch quiz data. Make sure the quiz is active.");
    } finally {
      setLoading(false);
    }
  }, [qid, token]);

  useEffect(() => {
    fetchQuizAndQuestions();
  }, [fetchQuizAndQuestions]);

  // Store user answer — quesKey is always a string
  const handleAnswerChange = (quesKey, answer) => {
    setUserAnswers((prev) => {
      const next = { ...prev, [quesKey]: answer };
      console.log("handleAnswerChange -> quesKey:", quesKey, "answer:", answer);
      console.log("Updated userAnswers:", next);
      return next;
    });
  };

  // Submit quiz & calculate score
  const handleSubmitQuiz = () => {
    if (!quizDetails) return;

    let correctAnswers = 0;
    const perQuestionMarks =
      quizDetails.maxMarks / (quizDetails.numberOfQuestions || questions.length || 1);

    questions.forEach((q, index) => {
      const quesKey = String(q.quesId ?? index); // same as used for inputs
      const userAns = (userAnswers[quesKey] || "").trim().toLowerCase();
      const correctAns = (q.answer || "").trim().toLowerCase();

      console.log(`Q ${index + 1} (key=${quesKey}) userAns='${userAns}' correctAns='${correctAns}'`);

      if (userAns && userAns === correctAns) {
        correctAnswers++;
      }
    });

    const finalScore = correctAnswers * perQuestionMarks;
    setScore(finalScore);
    console.log("Final score:", finalScore);
  };

  if (loading) return <h3>Loading quiz...</h3>;
  if (error) return <h3 className="text-danger">Error: {error}</h3>;
  if (questions.length === 0) return <h3>This quiz has no questions.</h3>;

  return (
    <div className="quiz-taking-container" style={{ padding: 12 }}>
      <h2 style={{ marginBottom: 16 }}>{quizDetails?.title || "Quiz"}</h2>

      {score === null ? (
        <>
          {questions.map((q, index) => {
            const quesKey = String(q.quesId ?? index); // guaranteed unique-ish key per question
            const groupName = `question-${quesKey}`; // radio group name (unique across questions)

            return (
              <div
                key={`q-${quesKey}-${index}`}
                className="question-card"
                style={{
                  borderRadius: 6,
                  border: "1px solid #e2e8f0",
                  padding: 12,
                  marginBottom: 12,
                  background: "#fff",
                }}
              >
                <h4 style={{ margin: "6px 0" }}>
                  {index + 1}. {q.content}
                </h4>

                <div className="options" style={{ marginLeft: 6 }}>
                  {q.option1 && (
                    <div className="option" style={{ marginBottom: 6 }}>
                      <input
                        id={`q-${quesKey}-opt1`}
                        type="radio"
                        name={groupName}
                        value={q.option1}
                        onChange={() => handleAnswerChange(quesKey, q.option1)}
                        checked={userAnswers[quesKey] === q.option1}
                      />
                      <label htmlFor={`q-${quesKey}-opt1`} style={{ marginLeft: 8 }}>
                        {q.option1}
                      </label>
                    </div>
                  )}

                  {q.option2 && (
                    <div className="option" style={{ marginBottom: 6 }}>
                      <input
                        id={`q-${quesKey}-opt2`}
                        type="radio"
                        name={groupName}
                        value={q.option2}
                        onChange={() => handleAnswerChange(quesKey, q.option2)}
                        checked={userAnswers[quesKey] === q.option2}
                      />
                      <label htmlFor={`q-${quesKey}-opt2`} style={{ marginLeft: 8 }}>
                        {q.option2}
                      </label>
                    </div>
                  )}

                  {q.option3 && (
                    <div className="option" style={{ marginBottom: 6 }}>
                      <input
                        id={`q-${quesKey}-opt3`}
                        type="radio"
                        name={groupName}
                        value={q.option3}
                        onChange={() => handleAnswerChange(quesKey, q.option3)}
                        checked={userAnswers[quesKey] === q.option3}
                      />
                      <label htmlFor={`q-${quesKey}-opt3`} style={{ marginLeft: 8 }}>
                        {q.option3}
                      </label>
                    </div>
                  )}

                  {q.option4 && (
                    <div className="option" style={{ marginBottom: 6 }}>
                      <input
                        id={`q-${quesKey}-opt4`}
                        type="radio"
                        name={groupName}
                        value={q.option4}
                        onChange={() => handleAnswerChange(quesKey, q.option4)}
                        checked={userAnswers[quesKey] === q.option4}
                      />
                      <label htmlFor={`q-${quesKey}-opt4`} style={{ marginLeft: 8 }}>
                        {q.option4}
                      </label>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <button onClick={handleSubmitQuiz} className="btn-submit-quiz" style={{ padding: "6px 10px" }}>
            Submit Quiz
          </button>
        </>
      ) : (
        <div className="quiz-result" style={{ padding: 12 }}>
          <h3>Quiz Finished!</h3>
          <p>
            Your Score: {score.toFixed(2)} / {quizDetails.maxMarks}
          </p>
          <button onClick={() => navigate("/normalpage")} className="btn-back-home" style={{ padding: "6px 10px" }}>
            Go Back to Categories
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizTakingPage;
