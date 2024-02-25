import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BASEURL}/users`

const create = async (userData) => {
  const response = await axios.post(baseUrl, userData)
  return response.data
}

const exports = { create }

export default exports
