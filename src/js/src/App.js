import React, { useState, useEffect } from 'react'
import { Table, Spin, Icon } from 'antd'
import { columns } from './columns'
import Container from './Container'
import Footer from './Footer'
import axios from './axios'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

function App() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getAllStudents = async () => {
      setIsLoading(true)
      const res = await axios.get('/students')

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
        <Footer numberOfStudents={students.length} />
      </Container>
    )
  }
}

export default App
