package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.exams.Category;
import com.example.demo.model.exams.Quiz;

public interface QuizRepository extends JpaRepository<Quiz,Long> 
{
    public List<Quiz> findByCategory(Category category);
     
    //Getting active quizzes
    public List<Quiz> findByActive(Boolean b);
    
    //Getting active quizzes and category
    public List<Quiz> findByCategoryAndActive(Category c,Boolean b);
}
