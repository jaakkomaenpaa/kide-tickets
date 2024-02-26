import axios from 'axios'
import config from '../config'

const baseUrl = `${config.SERVER_BASE_URL}/login`

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  const user = response.data
  window.localStorage.setItem('loggedUser', JSON.stringify(user))
  window.localStorage.setItem('authToken', `Bearer ${user.token}`)
}

const exports = { login }

export default exports
