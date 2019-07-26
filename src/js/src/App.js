import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import axios from './axios'

const columns = [
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
    return <Table dataSource={students} columns={columns} rowKey="studentId" />
  }

  return <h1>No Student Found!!</h1>
}

export default App
