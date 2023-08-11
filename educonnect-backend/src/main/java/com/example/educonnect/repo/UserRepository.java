package com.example.educonnect.repo;

import com.example.educonnect.model.User;
import com.example.educonnect.wrapper.UserWrapper;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {


    User findByEmail(String email);

    @Query("select u from User u where u.role='user'")
    List<User> getAllUser();

    @Query("select u from User u where u.email=?1")
    List<User> getByUsername(String currentUser);

    @Query("select new com.example.educonnect.wrapper.UserWrapper(u.id,u.userName,u.password,u.firstName,u.lastName,u.email,u.phone,u.status,u.profile,u.role) from User u where u.email=?1")
    Optional<UserWrapper> getByName(String currentUser);


    @Transactional
    @Modifying
    @Query("update User u set u.status=:status where u.id=:id")
    Integer updateStatus(String status, Integer id);
}
