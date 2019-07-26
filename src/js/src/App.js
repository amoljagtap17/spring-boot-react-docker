import React, { useState, useEffect } from 'react'
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

  if (students.length > 0) {
    return students.map(({ studentId, firstName, lastName, gender, email }) => (
      <div key={studentId}>
        <h2>{studentId}</h2>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{gender}</p>
        <p>{email}</p>
      </div>
    ))
  }

  return <h1>No Student Found!!</h1>
}

export default App
