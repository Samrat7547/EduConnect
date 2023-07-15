package com.example.educonnect.repo;

import com.example.educonnect.model.User;
import com.example.educonnect.wrapper.UserWrapper;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Integer> {

    User findByEmailId(@Param("email") String email);
    List<UserWrapper> getAllUser();

//    @Override
//    Optional<User> findById(Integer integer);

    List<UserWrapper>getByUsername(@Param("username") String currentUser);
    Optional<UserWrapper> getByName(@Param("username") String currentUser);


    @Transactional
    @Modifying
    Integer updateStatus(@Param("status") String status,@Param("id") Integer id);
}
