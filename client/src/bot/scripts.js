import Bot from './Bot'
import kideService from '../services/kide'

export const startBot = async (bot) => {

  await bot.waitForSaleStart()
  await bot.getEventData()
  await bot.startReservation()
}

export const initBot = async (eventId, authToken, userPreferences, sendStatusMessage) => {
  const event = await kideService.getEvent(eventId)
  if (!event) {
    sendStatusMessage('Event not found :(')
    return
  }
  sendStatusMessage('Event found')
  return new Bot(event, eventId, authToken, userPreferences, sendStatusMessage)
}