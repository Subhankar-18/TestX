package com.example.demo.service;

import java.util.Set;
import com.example.demo.model.exams.Category;

public interface CategoryService 
{
    //add service
    public Category addCategory(Category category);

    //update Category
    public Category updateCategory(Category category);

    //get all categories
    public Set<Category>getCategories();

    //get a single category
    public Category getCategory(Long categoryId);

    //delete category
    public void deleteCategory(Long categoryId);
}
