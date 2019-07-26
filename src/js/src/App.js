import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    const getAllStudents = async () => {
      const res = await axios.get('/students')

      setStudents(res.data)
    }

    getAllStudents()
  }, [])

  return (
    <Fragment>
      <h1>React App with Spring Boot!</h1>
      <ul>
        {students.map(student => (
          <li key={student.studentId}>
            {student.firstName} - {student.lastName}
          </li>
        ))}
      </ul>
    </Fragment>
  )
}

export default App
