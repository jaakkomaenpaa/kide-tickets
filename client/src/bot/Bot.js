import { sendStatusMessage, sleep } from '../utils'
import kideService from '../services/kide'

class Bot {
  constructor(event, eventUrl, authToken, userPreferences) {
    this.event = event
    this.eventUrl = eventUrl
    this.authToken = authToken
    this.userPreferences = userPreferences
    this.saleStartTime = new Date(event.saleStart)
    this.eventData = null
    this.maxTotalReservations = 200
    this.reservedAmount = 0
    this.variantsUsed = []
  }

  //############### PUBLIC #####################

  async waitForSaleStart() {
    if (this.saleStartTime > new Date()) {
      sendStatusMessage('Waiting until the sale starts')
      await sleep(this.saleStartTime - new Date())
    }
    return
  }

  async getEventData() {
    sendStatusMessage('Fetching event data...')
    while (true) {
      const response = await kideService.getEvent(this.eventUrl)
      if (
        response.salesStarted &&
        response.salesOngoing &&
        !response.salesPaused &&
        response.variants.length > 0
      ) {
        this.eventData = response
        return
      }
    }
  }

  async startReservation() {
    this.maxTotalReservations = this.eventData.maxTotalReservations || 200
    const variants = this.eventData.variants
    const { ticketIndex, keyword } = this.userPreferences

    sendStatusMessage('Starting the reservation...')

    // Reserve based on keyword
    if (keyword.length >= 3) {
      variants.forEach((variant) => {
        if (
          variant.name.toLowerCase().includes(keyword.toLowerCase()) &&
          variant.availability > 0 &&
          this.reservedAmount < this.maxTotalReservations
        ) {
          this.#getVariant(variant)
          this.variantsUsed.push(variant.id)
        }
      })
    }

    // Reserve based on ticket index
    if (ticketIndex >= 1 && variants.length >= ticketIndex) {
      const wantedVariant = variants[ticketIndex - 1]
      if (
        wantedVariant.availability > 0 &&
        this.reservedAmount < this.maxTotalReservations &&
        !this.variantsUsed.includes(wantedVariant.id)
      ) {
        this.#getVariant(wantedVariant)
        this.variantsUsed.push(wantedVariant.id)
      }
    }

    // Reserve as many other variants as possible
    variants.forEach((variant) => {
      if (
        !this.variantsUsed.includes(variant.id) &&
        variant.availability > 0 &&
        this.reservedAmount < this.maxTotalReservations
      ) {
        this.#getVariant(variant)
      }
    })
  }

  //############### PRIVATE #####################

  async #getVariant(variant) {
    const variantQuantity = Math.min(
      variant.productVariantMaximumReservableQuantity,
      variant.availability,
      this.maxTotalReservations - this.reservedAmount,
      10
    )

    this.reservedAmount += variantQuantity

    const response = await kideService.makeReservation(
      this.authToken,
      variant,
      variantQuantity
    )
    const status = response.status !== 'fail' ? 'Success' : 'Fail'
    sendStatusMessage(`${status} reserving type ${variant.name}`)
  }
}

export default Bot
