package com.ajfsdeveloper.springbootreactdocker.controllers;

import com.ajfsdeveloper.springbootreactdocker.exception.ApiRequestException;
import com.ajfsdeveloper.springbootreactdocker.models.Student;
import com.ajfsdeveloper.springbootreactdocker.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("students")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        throw new ApiRequestException("Oops cannot get all students with custom Exception!");
        // return studentService.getAllStudents();
    }

    @PostMapping
    public void addNewStudent(@RequestBody Student student) {
        studentService.addNewStudent(student);
    }
}
