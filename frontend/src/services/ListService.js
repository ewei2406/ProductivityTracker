import axios from 'axios'
const baseURL = '/api/ToDoList'

const getAll = () => {
  return axios.get(baseURL)
    .then(response => response.data)
}

const editTask = (newTask, index) => {
  return axios.put(`${baseURL}/${index}`, newTask)
    .then(response => response.data)
}

const deleteTask = (index) => {
  return axios.delete(`${baseURL}/${index}`)
}

const moveTask = (takeFrom, insertBefore) => {
  return axios.post(`${baseURL}/functions/move`, { takeFrom, insertBefore })
    .then(response => response.data)
}

const createTask = newTask => {
  return axios.post(baseURL, newTask)
    .then(response => response.data)
}

const ListService = { getAll, editTask, deleteTask, moveTask, createTask }

export default ListService
