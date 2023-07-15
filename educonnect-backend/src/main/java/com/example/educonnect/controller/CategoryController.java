package com.example.educonnect.controller;

import com.example.educonnect.model.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RequestMapping(path = "/category")
public interface CategoryController {

    @PostMapping(path= "/add")
    public ResponseEntity<Category> addCategory(@RequestBody Category category);

    @GetMapping(path = "/{cid}")
    public Category getCategory (@PathVariable("cid") Integer cid);

    @GetMapping(path = "/allCategory")
    public List<Category> getCategories();

    @PutMapping(path = "/update")
    public Category updateCategory(@RequestBody Category category);

    @DeleteMapping(path = "/{cid}")
    public  void deleteCategory(@PathVariable("cid") Integer cid);
}
