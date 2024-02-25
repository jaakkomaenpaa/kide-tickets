import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BASEURL}/login`

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const exports = { login }

export default exports
