package com.example.demo.service;

import java.util.Set;

import com.example.demo.model.exams.Quiz;

public interface QuizService 
{
    //add quiz
    public Quiz addQuiz(Quiz quiz);

    //updatequiz
    public Quiz updateQuiz(Quiz quiz);

    //get all quizzes
    public Set<Quiz>getQuizzes();

    //get a single quiz by its id
    public Quiz getQuiz(Long quizId);

    //delete a quiz
    public void deleteQuiz(Long quizId);
}
