package com.example.demo.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.exams.Question;
import com.example.demo.model.exams.Quiz;

public interface QuestionRepository extends JpaRepository<Question,Long> 
{

    Set<Question> findByQuiz(Quiz quiz);
    
}
