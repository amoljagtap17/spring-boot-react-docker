import axios from './axios'

const checkStatus = response => {
  if (response.ok) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response
    response.json().then(e => {
      error.error = e
    })

    return Promise.reject(error)
  }
}

export const getAllStudents = () => axios.get('/students').then(checkStatus)

export const addNewStudent = student =>
  axios.post('/students', JSON.stringify(student)).then(checkStatus)
