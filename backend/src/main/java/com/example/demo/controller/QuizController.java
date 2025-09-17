package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.exams.Category;
import com.example.demo.model.exams.Quiz;
import com.example.demo.service.QuizService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@CrossOrigin(
    origins = "http://localhost:3000")
@RequestMapping("/quiz")
public class QuizController
{
    @Autowired
    private QuizService quizService;

    //add quiz
    @PostMapping("/")
    public ResponseEntity <Quiz>add(@RequestBody Quiz quiz)
    {
        return ResponseEntity.ok(this.quizService.addQuiz(quiz));
    }

    //update quiz
    @PutMapping("/")
    public ResponseEntity<Quiz>update( @RequestBody Quiz quiz)
    {
        return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
    }

    //get all quiz
    @GetMapping("/")
    public ResponseEntity<?>quizzes()
    {
        return ResponseEntity.ok(this.quizService.getQuizzes());
    }

    //get quizzes by category
    @GetMapping("/category/{cid}")
   public List<Quiz>getQuizzesofCategory(@PathVariable ("cid") Long cid)
    {
        Category category=new Category();
        category.setCid(cid);
        return this.quizService.getQuizzesOfCategory(category);
    }

    //get single quiz
    @GetMapping("/{qid}")
    public Quiz quiz(@PathVariable("qid")Long qid)
    {
        return this.quizService.getQuiz(qid);
    }

    //get active quizzes
    @GetMapping("/active")
       public List<Quiz>getActiveofQuizzes()
    {
        return this.quizService.getActiveQuizzes();
    }

    //get active quizzes by category
    @GetMapping("/category/active/{cid}")
       public List<Quiz>getActiveofQuizzes(@PathVariable("cid") Long cid)
    {
         Category c =new Category();
         c.setCid(cid);
        return this.quizService.getActiveQuizzesofCategory(c);
    }


    //delete quiz
    @DeleteMapping("/{qid}")
    public void delete(@PathVariable("qid")Long qid)
    {
        this.quizService.deleteQuiz(qid);
    }


}
