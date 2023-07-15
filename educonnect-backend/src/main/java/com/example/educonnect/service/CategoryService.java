package com.example.educonnect.service;

import com.example.educonnect.model.Category;

import java.util.List;

public interface CategoryService {

    public Category addCategory(Category category);

    public Category updateCategory(Category category);

    public List<Category> getCategories();

    public Category getCategory(Integer cid);

    public void deleteCategory(Integer cid);


}
