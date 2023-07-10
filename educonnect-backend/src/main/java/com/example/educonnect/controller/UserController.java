package com.example.educonnect.controller;

import com.example.educonnect.wrapper.UserWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RequestMapping(path = "/user")
public interface UserController {
    @CrossOrigin
    @PostMapping(path= "/signup")
    public ResponseEntity<String> signup(@RequestBody Map<String,String> requestMap);
    @PostMapping("/login")
    public ResponseEntity<String> login (@RequestBody Map<String,String> requestMap);

//    @CrossOrigin
//    @GetMapping("/{userName}")
//    public ResponseEntity<UserWrapper> getSingleUser(@PathVariable String userName);

    @CrossOrigin
    @GetMapping("/userDetails")
    public ResponseEntity<List<UserWrapper>> getAllUsers();

    @PostMapping("/updateStatus")
    public ResponseEntity<String> updateStatus(@RequestBody Map<String,String> requestMap);

    @PostMapping("/update")
    public ResponseEntity<String> update(@RequestBody Map<String,String> requestMap);


}

