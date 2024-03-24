import axios from 'axios'

import { getRequestId, reverseString, stripIdFromUrl } from '../utils'
import config from '../config'

const getEvent = async (eventUrl) => {
  try {
    const eventId = stripIdFromUrl(eventUrl)
    const request = await axios.get(`${config.KIDE_PRODUCT_URL}${eventId}`)
    console.log(request.data)
    const product = request.data.model.product

    return {
      saleStart: product.dateSalesFrom,
      salesStarted: product.salesStarted,
      salesOngoing: product.salesOngoing,
      salesPaused: product.salesPaused,
      maxTotalReservations: product.maxTotalReservationsPerCheckout,
      variants: request.data.model.variants,
      picture: product.mediaFileName
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
    'X-Requested-Token-C69': getRequestId(variant.inventoryId),
    'Content-Type': 'application/json;charset=UTF-8',
  }

  console.log('headers', headers)

  try {
    const response = await axios.post(config.KIDE_RESERVATION_URL, body, { headers })
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
