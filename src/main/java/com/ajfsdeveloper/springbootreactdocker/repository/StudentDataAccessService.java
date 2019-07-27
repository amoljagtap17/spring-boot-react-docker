package com.ajfsdeveloper.springbootreactdocker.repository;

import com.ajfsdeveloper.springbootreactdocker.models.Student;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class StudentDataAccessService {

    public List<Student> selectAllStudents() {
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
