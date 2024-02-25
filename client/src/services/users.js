import axios from 'axios'
import config from '../config'

const baseUrl = `${config.SERVER_BASE_URL}/users`

const create = async (userData) => {
  const response = await axios.post(baseUrl, userData)
  return response.data
}

const exports = { create }

export default exports
