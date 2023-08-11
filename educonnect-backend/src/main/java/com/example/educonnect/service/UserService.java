package com.example.educonnect.service;

import com.example.educonnect.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UserService {

    //creating user
    //public User createUser(User user, Set<UserRole> userRoles);

    ResponseEntity<String> signup(Map<String, String> requestMap);

    ResponseEntity<String> login(Map<String, String> requestMap);


    public List<User> getAllUser();

    ResponseEntity<String> updateStatus(Map<String, String> requestMap);

    ResponseEntity<String> update(Map<String, String> requestMap);


    ResponseEntity<String> deleteUser(Integer id);

    ResponseEntity<Optional> getCurrentUser();
}
