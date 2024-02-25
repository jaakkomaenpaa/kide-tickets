import axios from 'axios'
import config from '../config'

const baseUrl = `${config.SERVER_BASE_URL}/login`

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const exports = { login }

export default exports
