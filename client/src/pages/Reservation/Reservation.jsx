import { useEffect, useState } from 'react'

import './../../styles/reserve.css'
import ReservationForm from './ReservationForm'
import InfoBox from './InfoBox'
import Timer from './Timer'

const Reservation = () => {
  const [accessAllowed, setAccessAllowed] = useState(false)
  const [accessInput, setAccessInput] = useState('')

  const [formSubmitted, setFormSubmitted] = useState(false)

  const [saleStartTime, setSaleStartTime] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')

  const accessCode = process.env.REACT_APP_ACCESS_CODE

  useEffect(() => {
    if (window.localStorage.getItem('access')) {
      setAccessAllowed(true)
    } else {
      setAccessAllowed(false)
    }
  }, [accessAllowed])

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
    return (
      <div>
        <InfoBox statusMessage={statusMessage} />
        {saleStartTime !== null ? (
          <Timer saleStartTime={saleStartTime} />
        ) : null}
      </div>
    )
  }

  return (
    <>
      <ReservationForm
        setSubmitted={setFormSubmitted}
        setSaleStartTime={setSaleStartTime}
      />
    </>
  )
}

export default Reservation
