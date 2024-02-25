import { useEffect, useState } from 'react'

import { startBot, initBot } from '../../bot/scripts'
import './../../styles/reserve.css'
import ReservationForm from './ReservationForm'
import InfoBox from './InfoBox'

const Reservation = () => {
  const [accessAllowed, setAccessAllowed] = useState(false)
  const [accessInput, setAccessInput] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [saleStartTime, setSaleStartTime] = useState(null)
  const [statusList, setStatusList] = useState([])

  const accessCode = process.env.REACT_APP_ACCESS_CODE

  useEffect(() => {
    if (window.localStorage.getItem('access')) {
      setAccessAllowed(true)
    } else {
      setAccessAllowed(false)
    }
  }, [accessAllowed])

  const submit = async ({ eventUrl, authToken, ticketIndex, keyword }) => {
    setFormSubmitted(true)
    const userPreferences = {
      ticketIndex: ticketIndex || 0,
      keyword: keyword || '',
    }
    const bot = await initBot(
      eventUrl,
      authToken,
      userPreferences,
      sendStatusMessage
    )
    setSaleStartTime(bot.saleStartTime)
    await startBot(bot)
  }

  const sendStatusMessage = (message) => {
    setStatusList((prevStatusList) => [...prevStatusList, message])
  }

  const handleAccess = () => {
    if (accessInput === accessCode) {
      window.localStorage.setItem('access', true)
      setAccessAllowed(true)
    }
  }

  if (!accessAllowed) {
    return (
      <>
        <input
          type='text'
          value={accessInput}
          placeholder='Access code'
          onChange={(event) => setAccessInput(event.target.value)}
        />
        <button onClick={handleAccess}>Access</button>
      </>
    )
  }

  if (formSubmitted) {
    return <InfoBox statusList={statusList} saleStartTime={saleStartTime} />
  }

  return (
    <>
      <ReservationForm
        setSubmitted={setFormSubmitted}
        setSaleStartTime={setSaleStartTime}
        submit={submit}
      />
    </>
  )
}

export default Reservation
