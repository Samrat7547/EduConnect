package com.example.educonnect.controllerImpl;

import com.example.educonnect.controller.CategoryController;
import com.example.educonnect.model.Category;
import com.example.educonnect.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@CrossOrigin
@RestController
public class CategoryControllerImpl implements CategoryController {

    private final CategoryService categoryService;

    @Override
    public ResponseEntity<Category> addCategory(Category category) {
       Category category1 = this.categoryService.addCategory(category);
       return ResponseEntity.ok(category1);
    }

    @Override
    public Category getCategory(Integer cid) {
        return this.categoryService.getCategory(cid);
    }

    @Override
    public List<Category> getCategories() {
        return this.categoryService.getCategories();
    }

    @Override
    public Category updateCategory(Category category) {
        return this.categoryService.updateCategory(category);
    }

    @Override
    public void deleteCategory(Integer cid) {
         this.categoryService.deleteCategory(cid);
    }
}
