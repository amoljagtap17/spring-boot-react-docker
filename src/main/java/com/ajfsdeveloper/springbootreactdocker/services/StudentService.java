package com.ajfsdeveloper.springbootreactdocker.services;

import com.ajfsdeveloper.springbootreactdocker.models.Student;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StudentService {

    public List<Student> getAllStudents() {
        return List.of(
                new Student(
                        UUID.randomUUID(),
                        "James",
                        "Bond",
                        "james.bond@test.com",
                        Student.Gender.MALE
                ),
                new Student(
                        UUID.randomUUID(),
                        "Elisa",
                        "Tamara",
                        "elisa.tamara@test.com",
                        Student.Gender.FEMALE
                )
        );
    }
}
