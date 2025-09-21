import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Normalpage.css";

const QuizTakingPage = () => {
  const { qid } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizDetails, setQuizDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(null);
  const [tabSwitched, setTabSwitched] = useState(false); // NEW
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuestions(questionsResponse.data || []);
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

  // Prevent leaving/reloading the page until quiz is submitted
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (score === null) {
        e.preventDefault();
        e.returnValue = "Are you sure? Your quiz progress will be lost!";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [score]);

  // Track tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && score === null) {
        setTabSwitched(true); // mark that user switched tabs
        alert("You switched tabs! Your quiz progress may be affected.");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [score]);

  // Handle answer change
  const handleAnswerChange = (quesKey, answer) => {
    setUserAnswers((prev) => ({ ...prev, [quesKey]: answer }));
  };

  // Submit quiz & calculate score
  const handleSubmitQuiz = () => {
    if (!quizDetails) return;

    let correctAnswers = 0;
    const perQuestionMarks =
      quizDetails.maxMarks / (quizDetails.numberOfQuestions || questions.length || 1);

    questions.forEach((q, index) => {
      const quesKey = String(q.quesId ?? index);
      const userAns = (userAnswers[quesKey] || "").trim().toLowerCase();
      const correctAns = (q.answer || "").trim().toLowerCase();
      if (userAns && userAns === correctAns) correctAnswers++;
    });

    const finalScore = correctAnswers * perQuestionMarks;
    setScore(finalScore);
  };

  // Progress bar
  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = questions.length;
  const progressPercent = ((answeredCount / totalQuestions) * 100).toFixed(0);

  if (loading) return <h3>Loading quiz...</h3>;
  if (error) return <h3 className="text-danger">Error: {error}</h3>;
  if (questions.length === 0) return <h3>This quiz has no questions.</h3>;

  return (
    <div className="normal-container">
      <div className="content flex-grow-1 p-4">
        <h2 className="mb-4 quiz-title">{quizDetails?.title || "Quiz"}</h2>

        {score === null ? (
          <>
            {/* Progress Bar */}
            <div className="quiz-progress-bar mb-4">
              <div
                className="quiz-progress-filled"
                style={{ width: `${progressPercent}%` }}
              >
                {answeredCount}/{totalQuestions} answered
              </div>
            </div>

            {questions.map((q, index) => {
              const quesKey = String(q.quesId ?? index);
              const groupName = `question-${quesKey}`;
              return (
                <div key={quesKey} className="quiz-question-card">
                  <h4 className="quiz-question">
                    {index + 1}. {q.content}
                  </h4>
                  <div className="quiz-options">
                    {[q.option1, q.option2, q.option3, q.option4].map(
                      (opt, i) =>
                        opt && (
                          <label key={i} className="quiz-option-label">
                            <input
                              type="radio"
                              name={groupName}
                              value={opt}
                              checked={userAnswers[quesKey] === opt}
                              onChange={() => handleAnswerChange(quesKey, opt)}
                            />
                            {opt}
                          </label>
                        )
                    )}
                  </div>
                </div>
              );
            })}

            <button
              className="btn btn-primary quiz-submit-btn"
              onClick={handleSubmitQuiz}
            >
              Submit Quiz
            </button>
          </>
        ) : (
          <div className="quiz-result-card">
            <h3>Quiz Finished!</h3>
            <p className="quiz-score">
              Your Score: {score.toFixed(2)} / {quizDetails.maxMarks}
            </p>
            {/* Show if user switched tab */}
            {tabSwitched && (
              <p className="text-warning">
                ⚠️ You switched tabs during the quiz. This may have affected your score.
              </p>
            )}
            <button
              className="btn btn-outline-primary quiz-back-btn"
              onClick={() => navigate("/normalpage")}
            >
              Go Back to Categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizTakingPage;
