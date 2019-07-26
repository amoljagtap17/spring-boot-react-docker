import React, { useState, useEffect } from 'react'
import { Table, Avatar, Spin, Icon } from 'antd'
import Container from './Container'
import axios from './axios'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getAllStudents = async () => {
      setIsLoading(true)
      const res = await axios.get('students')

      setStudents(res.data)
      setIsLoading(false)
    }

    getAllStudents()
  }, [])

  if (isLoading) {
    return (
      <Container>
        <Spin indicator={antIcon} />
      </Container>
    )
  } else {
    return (
      <Container>
        {students.length > 0 && (
          <Table
            dataSource={students}
            columns={columns}
            pagination={false}
            loading={isLoading}
            rowKey="studentId"
          />
        )}
        {students.length === 0 && <h1>No Student Found!!</h1>}
      </Container>
    )
  }
}

export default App
