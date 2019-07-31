package com.ajfsdeveloper.springbootreactdocker.utils;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class EmailValidatorTest {

    private final EmailValidator underTest = new EmailValidator();

    @Test
    public void itShouldValidateCorrectEmail() {
        assertThat(underTest.test("hello@gmail.com")).isTrue();
    }

    @Test
    public void itShouldValidateInCorrectEmail() {
        assertThat(underTest.test("hello.com")).isFalse();
    }

    @Test
    public void itShouldValidateInCorrectEmailWithoutDotAtTheEnd() {
        assertThat(underTest.test("hello@gmail")).isFalse();
    }
}