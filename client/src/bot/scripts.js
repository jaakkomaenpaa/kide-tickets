import Bot from './Bot'
import kideService from '../services/kide'
import { sendStatusMessage } from '../utils'

export const startBot = async (bot) => {

  await bot.waitForSaleStart()
  await bot.getEventData()
  await bot.startReservation()
}

export const initBot = async (eventUrl, authToken, userPreferences) => {
  const event = await kideService.getEvent(eventUrl)
  if (!event) {
    sendStatusMessage('Event not found :(')
    return
  }
  
  return new Bot(event, eventUrl, authToken, userPreferences)
}