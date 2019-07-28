import React from 'react'
import axios from '../axios'
import { Formik } from 'formik'
import { Input, Button, Tag } from 'antd'

const inputBottomMargin = { marginBottom: '10px' }
const tagStyle = {
  backgroundColor: '#f50',
  color: 'white',
  ...inputBottomMargin
}

const AddStudentForm = props => {
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', gender: '' }}
      validate={values => {
        let errors = {}

        if (!values.firstName) {
          errors.firstName = 'First Name Required'
        }

        if (!values.lastName) {
          errors.lastName = 'Last Name Required'
        }

        if (!values.email) {
          errors.email = 'Email Required'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address'
        }

        if (!values.gender) {
          errors.gender = 'Gender Required'
        } else if (
          !['MALE', 'male', 'FEMALE', 'female'].includes(values.gender)
        ) {
          errors.gender = 'Gender must be (MALE, male, FEMALE, female)'
        }

        return errors
      }}
      onSubmit={async (student, { setSubmitting }) => {
        await axios.post('/students', JSON.stringify(student))
        props.onSuccess()
        setSubmitting(false)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitForm,
        isValid
      }) => (
        <form onSubmit={handleSubmit}>
          <Input
            style={inputBottomMargin}
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            placeholder="First Name"
          />
          {errors.firstName && touched.firstName && (
            <Tag style={tagStyle}>{errors.firstName}</Tag>
          )}
          <Input
            style={inputBottomMargin}
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            placeholder="Last Name"
          />
          {errors.lastName && touched.lastName && (
            <Tag style={tagStyle}>{errors.lastName}</Tag>
          )}
          <Input
            style={inputBottomMargin}
            name="email"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Email"
          />
          {errors.email && touched.email && (
            <Tag style={tagStyle}>{errors.email}</Tag>
          )}
          <Input
            style={inputBottomMargin}
            name="gender"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.gender}
            placeholder="Gender"
          />
          {errors.gender && touched.gender && (
            <Tag style={tagStyle}>{errors.gender}</Tag>
          )}
          <Button
            type="submit"
            onClick={() => submitForm()}
            disabled={isSubmitting || (touched && !isValid)}
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  )
}

export default AddStudentForm
