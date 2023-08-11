package com.example.educonnect.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name="category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cid;

    private String title;
    @Column(length = 5000)
    private String description;

//    @OneToMany(mappedBy = "category", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Quiz> quizzes= new LinkedHashSet<>();

}
