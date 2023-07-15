package com.example.educonnect.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name="question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer quesId;

    @Column(length = 5000)
    private String content;
    private String image;
    private String option1;
    private String option2;
    private String option3;
    private String option4;

    private String answer;


    @ManyToOne(fetch = FetchType.EAGER)
    private Quiz quiz;
}
