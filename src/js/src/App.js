import React, { useState, useEffect, Fragment } from 'react'
import { Table, Spin, Icon, Modal, Empty } from 'antd'
import { columns } from './columns'
import Container from './Container'
import Footer from './Footer'
import AddStudentForm from './forms/AddStudentForm'
import { errorNotification } from './Notification'
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
    try {
      const res = await axios.get('/students')
      console.log('res', res)
      setStudents(res.data)
      setIsLoading(false)
    } catch (error) {
      if (error.data) {
        console.log('err', error.data)
        errorNotification(error.data.message, error.data.error)
      }
      setIsLoading(false)
    }
  }

  const openAddStudentModal = () => setIsAddStudentModalVisible(true)

  const closeAddStudentModal = () => setIsAddStudentModalVisible(false)

  const commonElements = () => (
    <Fragment>
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
    </Fragment>
  )

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
        {students.length === 0 && (
          <Empty description={<h1>No Student Found!!</h1>} />
        )}
        {commonElements()}
      </Container>
    )
  }
}

export default App
