import axios from 'axios'
import config from '../config'

const baseUrl = `${config.SERVER_BASE_URL}/users`

const getUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`)
  return response.data
}

const create = async (userData) => {
  const response = await axios.post(baseUrl, userData)
  return response.data
}

const update = async (user) => {
  const auth = {
    headers: { authorization: window.localStorage.getItem('authToken') },
  }
  await axios.put(`${baseUrl}/${user.id}`, user, auth)
}

const remove = async(userId) => {
  const auth = {
    headers: { authorization: window.localStorage.getItem('authToken') },
  }
  await axios.delete(`${baseUrl}/${userId}`, auth)
}

const exports = { getUser, create, update, remove }
export default exports
