import React, { useState, useEffect } from 'react'
import { Table, Spin, Icon, Modal } from 'antd'
import { columns } from './columns'
import Container from './Container'
import Footer from './Footer'
import AddStudentForm from './forms/AddStudentForm'
import axios from './axios'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

function App() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(
    false
  )

  useEffect(() => {
    getAllStudents()
  }, [])

  const getAllStudents = async () => {
    setIsLoading(true)
    const res = await axios.get('/students')

    setStudents(res.data)
    setIsLoading(false)
  }

  const openAddStudentModal = () => setIsAddStudentModalVisible(true)

  const closeAddStudentModal = () => setIsAddStudentModalVisible(false)

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
            style={{ marginBottom: '100px' }}
            dataSource={students}
            columns={columns}
            pagination={false}
            loading={isLoading}
            rowKey="studentId"
          />
        )}
        {students.length === 0 && <h1>No Student Found!!</h1>}
        <Modal
          title="Add New Student"
          visible={isAddStudentModalVisible}
          onOk={closeAddStudentModal}
          onCancel={closeAddStudentModal}
          width={1000}
        >
          <AddStudentForm
            onSuccess={() => {
              closeAddStudentModal()
              getAllStudents()
            }}
          />
        </Modal>
        <Footer
          numberOfStudents={students.length}
          handleAddStudentClick={openAddStudentModal}
        />
      </Container>
    )
  }
}

export default App
