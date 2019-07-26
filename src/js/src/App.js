import React, { useState, useEffect } from 'react'
import { Table, Avatar } from 'antd'
import Container from './Container'
import axios from './axios'

const columns = [
  {
    title: '',
    key: 'avatar',
    render: (text, student) => (
      <Avatar size="large">
        {`${student.firstName.charAt(0).toUpperCase()}${student.lastName
          .charAt(0)
          .toUpperCase()}`}
      </Avatar>
    )
  },
  {
    title: 'Student Id',
    dataIndex: 'studentId',
    key: 'studentId'
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName'
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender'
  }
]

function App() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    const getAllStudents = async () => {
      const res = await axios.get('students')

      setStudents(res.data)
    }

    getAllStudents()
  }, [])

  if (students.length > 0) {
    return (
      <Container>
        <Table
          dataSource={students}
          columns={columns}
          pagination={false}
          rowKey="studentId"
        />
      </Container>
    )
  }

  return <h1>No Student Found!!</h1>
}

export default App
