package com.example.educonnect.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
@NamedQuery(name="User.findByEmailId",query="select u from User u where u.email=:email")
@NamedQuery(name="User.updateStatus",query="update User u set u.status=:status where u.id=:id")

@NamedQuery(name="User.getAllUser",query="select new com.example.educonnect.wrapper.UserWrapper(u.id,u.userName,u.password,u.firstName,u.lastName,u.email,u.phone,u.status,u.profile) from User u where u.role='user'")
@NamedQuery(name="User.getByUsername",query="select new com.example.educonnect.wrapper.UserWrapper(u.id,u.userName,u.password,u.firstName,u.lastName,u.email,u.phone,u.status,u.profile) from User u where u.email=:username")
@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name="_user")
public class User implements Serializable {

    private static  final long serialVersionUID=1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private String userName;
    private String password;
    private String firstName;
    private String lastName;

    private String email;
    private String phone;
    //private boolean enabled = true;
    private String status;
    private String profile;
    private String role;

//    //user many roles
//    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER, mappedBy = "user")
//    @JsonIgnore
//    private Set<UserRole> userRoles =new HashSet<>();

}
