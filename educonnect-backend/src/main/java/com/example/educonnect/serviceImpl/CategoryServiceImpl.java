package com.example.educonnect.serviceImpl;

import com.example.educonnect.jwt.JwtFilter;
import com.example.educonnect.model.Category;
import com.example.educonnect.model.User;
import com.example.educonnect.repo.CategoryRepo;
import com.example.educonnect.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;


    @Override
    public Category addCategory(Category category) {
        return this.categoryRepo.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return this.categoryRepo.save(category);
    }

    @Override
    public List<Category> getCategories() {
        return this.categoryRepo.findAll();
    }

    @Override
    public Category getCategory(Integer cid) {
        return this.categoryRepo.findById(cid).get();
    }

    @Override
    public void deleteCategory(Integer cid) {
        this.categoryRepo.deleteById(cid);
    }



}
