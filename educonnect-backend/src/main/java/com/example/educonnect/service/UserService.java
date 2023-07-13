package com.example.educonnect.service;

import com.example.educonnect.wrapper.UserWrapper;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface UserService {

    //creating user
    //public User createUser(User user, Set<UserRole> userRoles);

    ResponseEntity<String> signup(Map<String, String> requestMap);
    ResponseEntity<String> login(Map<String, String> requestMap);

//    ResponseEntity<UserWrapper> getSingleUser(String userName);

    ResponseEntity<List<UserWrapper>> getAllUser();

    ResponseEntity<String> updateStatus(Map<String, String> requestMap);

    ResponseEntity<String> update(Map<String, String> requestMap);


    ResponseEntity<String> deleteUser(Integer id);
}
