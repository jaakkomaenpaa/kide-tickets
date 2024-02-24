import { useState, useEffect } from 'react'

import { formatTime, sleep } from '../../utils'

// Displays a timer that starts a countdown until the sale starting time
const Timer = ({ saleStartTime }) => {
  const [timeLeft, setTimeLeft] = useState(saleStartTime - new Date())

  useEffect(() => {
    const countdown = async () => {
      if (timeLeft > 0) {
        await sleep(1000)
        setTimeLeft(saleStartTime - new Date())
      }
    }
    countdown()
  }, [timeLeft, saleStartTime])

  return (
    <div className='infoText'>
      {timeLeft <= 0
        ? 'Just a moment...'
        : `Sale starts in: ${formatTime(timeLeft)}`}
    </div>
  )
}

export default Timer