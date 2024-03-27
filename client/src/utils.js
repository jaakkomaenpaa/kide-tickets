import config from './config'

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${hours}h ${minutes}m ${seconds}s`
}

export const reverseString = (string) => {
  return string.split('').reverse().join('')
}

// Modify some bits
export const getRequestId = (inventoryId) => {
  const secret = config.SECRET
  return btoa(
    [...inventoryId.replace(/-/g, '')]
      .map((char, i) =>
        String.fromCharCode(char.charCodeAt(0) ^ secret.charCodeAt(i))
      )
      .join('')
  ).substring(0, 8)
}

// Get event id from full url
export const stripIdFromUrl = (url) => {
  if (!url.includes('/')) {
    return url
  }
  const parts = url.split('/')
  console.log('id', parts[parts.length - 1])
  return parts[parts.length - 1]
}