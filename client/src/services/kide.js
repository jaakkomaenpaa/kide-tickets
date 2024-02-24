import axios from 'axios'

import { getRequestId } from '../utils'
import { reverseString } from '../utils'

const baseUrl = 'https://api.kide.app/api/products/'
const reservationUrl = 'https://api.kide.app/api/reservations'

const getEvent = async (eventUrl) => {
  try {
    const request = await axios.get(`${baseUrl}${eventUrl}`)
    console.log(request.data)
    const product = request.data.model.product

    return {
      saleStart: product.dateSalesFrom,
      salesStarted: product.salesStarted,
      salesOngoing: product.salesOngoing,
      salesPaused: product.salesPaused,
      maxTotalReservations: product.maxTotalReservationsPerCheckout,
      variants: request.data.model.variants,
    }
  } catch (error) {
    console.log(error)
    return { status: 'fail' }
  }
}

const makeReservation = async (authToken, variant, quantity) => {
  const body = {
    toCreate: [
      {
        inventoryId: variant.inventoryId,
        quantity,
        productVariantUserForm: null,
      },
    ],
    toCancel: [],
    expectCart: true,
  }

  console.log('Request body', body)

  const headers = {
    authorization: `Bearer ${reverseString(authToken)}`,
    'X-Requested-Token-6e0': getRequestId(variant.inventoryId),
    'Content-Type': 'application/json;charset=UTF-8',
  }

  console.log('headers', headers)

  try {
    const response = await axios.post(reservationUrl, body, { headers })
    console.log(`Success reserving type ${variant.name}`)
    return response
  } catch (error) {
    console.log(`Fail reserving type ${variant.name}`)
    console.error(error)
    return { status: 'fail' }
  }
}

const exports = { getEvent, makeReservation }
export default exports
