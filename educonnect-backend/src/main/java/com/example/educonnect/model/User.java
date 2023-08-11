package com.example.educonnect.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;


@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "_user")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private String userName;
    @JsonIgnore
    private String password;
    private String firstName;
    private String lastName;

    private String email;
    private String phone;
//    private boolean enabled = true;
    private String status;
    private String profile;
    private String role;


}
