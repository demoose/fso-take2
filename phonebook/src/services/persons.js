import axios from "axios"

const url = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const create = (personObject) => {
  const request = axios.post(url, personObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => response.data)
}

const update = (id) => {
  
}

export default { getAll, create, remove }