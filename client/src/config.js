const ACCESS_CODE = process.env.REACT_APP_ACCESS_CODE
const SECRET = process.env.REACT_APP_SECRET_STRING
const SERVER_BASE_URL = process.env.REACT_APP_BASEURL

const KIDE_PRODUCT_URL = 'https://api.kide.app/api/products/'
const KIDE_RESERVATION_URL = 'https://api.kide.app/api/reservations'

const exports = {
  ACCESS_CODE,
  SECRET,
  SERVER_BASE_URL,
  KIDE_PRODUCT_URL,
  KIDE_RESERVATION_URL,
}

export default exports