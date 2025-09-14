package com.example.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.exams.Category;
import com.example.demo.service.CategoryService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/category")
public class CategoryController
{
    @Autowired
    private CategoryService categoryService;

    //add category
    @PostMapping("/")
    public ResponseEntity<?>addCategory(@RequestBody Category category) 
    {
        Category category1=this.categoryService.addCategory(category);
        return ResponseEntity.ok(category1);
    }

    //get category
    @GetMapping("/{categoryId}")
    public Category getCategory(@PathVariable("categoryId")Long categoyId)
    {
        return this.categoryService.getCategory(categoyId);
    }

    //get all categories
    @GetMapping("/")
    public ResponseEntity<?>getCategories()
    {
        return ResponseEntity.ok(this.categoryService.getCategories());
    }

    //update categories
    @PutMapping("/")
    public Category updateCategory(@RequestBody Category category)
    {
        return this.categoryService.updateCategory(category);
    }

    //delete category
    @DeleteMapping
    public void deleteCategory(@PathVariable("categoryId")Long categoryId)
    {
        this.categoryService.deleteCategory(categoryId);
    }
}
