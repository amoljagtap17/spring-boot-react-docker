package com.ajfsdeveloper.springbootreactdocker.services;

import com.ajfsdeveloper.springbootreactdocker.exception.ApiRequestException;
import com.ajfsdeveloper.springbootreactdocker.models.Student;
import com.ajfsdeveloper.springbootreactdocker.repository.StudentDataAccessService;
import com.ajfsdeveloper.springbootreactdocker.utils.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentDataAccessService studentDataAccessService;
    private final EmailValidator emailValidator;

    @Autowired
    public StudentService(StudentDataAccessService studentDataAccessService, EmailValidator emailValidator) {
        this.studentDataAccessService = studentDataAccessService;
        this.emailValidator = emailValidator;
    }

    public List<Student> getAllStudents() {
        return studentDataAccessService.selectAllStudents();
    }

    public void addNewStudent(Student student) {
        addNewStudent(null, student);
    }

    public void addNewStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());

        // TODO: validate email
        if (!emailValidator.test(student.getEmail())) {
            throw new ApiRequestException(student.getEmail() + " is not valid");
        }

        // TODO: Verify that email is not taken

        studentDataAccessService.insertStudent(newStudentId, student);
    }
}
