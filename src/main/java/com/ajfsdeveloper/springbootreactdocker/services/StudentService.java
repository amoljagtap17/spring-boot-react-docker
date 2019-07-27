package com.ajfsdeveloper.springbootreactdocker.services;

import com.ajfsdeveloper.springbootreactdocker.models.Student;
import com.ajfsdeveloper.springbootreactdocker.repository.StudentDataAccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentDataAccessService studentDataAccessService;

    @Autowired
    public StudentService(StudentDataAccessService studentDataAccessService) {
        this.studentDataAccessService = studentDataAccessService;
    }

    public List<Student> getAllStudents() {
        return studentDataAccessService.selectAllStudents();
    }
}
