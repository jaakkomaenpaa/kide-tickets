import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import '../styles/account.css'
import userService from '../services/users'

const Account = () => {
  const [loggedUser, setLoggedUser] = useState(null)
  const [eventUrl, setEventUrl] = useState('')
  const [kideToken, setKideToken] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const updateUser = async (userId) => {
      const updatedUser = await userService.getUser(userId)
      setLoggedUser(updatedUser)
      window.localStorage.setItem('loggedUser', JSON.stringify(updatedUser))
    }

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      updateUser(loggedUser.id)
    } else {
      setLoggedUser(null)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    navigate('/home')
    window.location.reload()
  }

  const addEvent = async () => {
    const updatedUser = {
      ...loggedUser,
      favoriteEventUrls: [...loggedUser.favoriteEventUrls.concat(eventUrl)],
    }
    await userService.update(updatedUser)
    window.location.reload()
  }

  const setToken = async () => {
    const updatedUser = {
      ...loggedUser,
      kideAuthToken: kideToken,
    }
    await userService.update(updatedUser)
    setKideToken('')
  }

  const removeAccount = async () => {
    await userService.remove(loggedUser.id)
    window.localStorage.removeItem('loggedUser')
    navigate('/home')
    window.location.reload()
  }

  if (!loggedUser) {
    return <p>You have not logged in</p>
  }

  return (
    <div>
      <h3>My account</h3>
      <p>Logged in as {loggedUser?.username}</p>
      <div className='eventField'>
        {loggedUser.favoriteEventUrls.length > 0 ? (
          <div>
            Favorite events:
            <ul>
              {loggedUser.favoriteEventUrls.map((event) => (
                <li key={event}>{event}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No favorite events yet</div>
        )}
      </div>
      <div>Add to favorite events:</div>
      <div className='updateField'>
        <input
          value={eventUrl}
          placeholder='Event url'
          onChange={(event) => setEventUrl(event.target.value)}
        />
        <button onClick={addEvent}>+</button>
      </div>
      <div>Update kide bearer token:</div>
      <div className='updateField'>
        <input
          value={kideToken}
          placeholder='Kide bearer token'
          onChange={(event) => setKideToken(event.target.value)}
        />
        <button onClick={setToken}>+</button>
      </div>

      <button onClick={logout}>Log out</button>
      <button onClick={removeAccount}>Remove account</button>
    </div>
  )
}

export default Account
