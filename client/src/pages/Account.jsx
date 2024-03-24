import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { stripIdFromUrl } from '../utils'
import '../styles/account.css'
import userService from '../services/users'
import kideService from '../services/kide'

const Account = () => {
  const [loggedUser, setLoggedUser] = useState(null)
  const [eventData, setEventData] = useState({ key: '', url: '' })
  const [kideToken, setKideToken] = useState('')
  const [error, setError] = useState('')

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
    window.localStorage.removeItem('authToken')
    navigate('/home')
    window.location.reload()
  }

  const addEvent = async () => {
    if (!eventData.key || !eventData.url) {
      setError('Both fields required')
      return
    }
    console.log(eventData)
    const event = await kideService.getEvent(eventData.url)
    if (event.status === 'fail') {
      setError('Provide a valid event url or id')
      return
    }
    const mergedEvent = {...event, ...eventData}
    const updatedUser = {
      ...loggedUser,
      favoriteEvents: [...loggedUser.favoriteEvents.concat(mergedEvent)],
    }
    await userService.update(updatedUser)
    window.location.reload()
  }

  const removeEvent = async (eventToRemove) => {
    const updatedUser = {
      ...loggedUser,
      favoriteEvents: loggedUser.favoriteEvents.filter(
        (event) => event._id !== eventToRemove._id
      ),
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
    window.location.reload()
  }

  const removeAccount = async () => {
    if (window.confirm('Are you sure you want to remove your account?')) {
      await userService.remove(loggedUser.id)
      window.localStorage.removeItem('loggedUser')
      window.localStorage.removeItem('authToken')
      navigate('/home')
      window.location.reload()
    }
  }

  if (!loggedUser) {
    return <p>You have not logged in</p>
  }

  return (
    <div>
      <h3>My account</h3>
      <p>Logged in as {loggedUser?.username}</p>
      <div className='eventField'>
        {loggedUser.favoriteEvents.length > 0 ? (
          <div>
            Favorite events:
            <ul>
              {loggedUser.favoriteEvents.map((event) => (
                <li key={event._id}>
                  {event.key} - {event.url}{' '}
                  <button
                    className='removeButton'
                    onClick={() => removeEvent(event)}
                  >
                    remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No favorite events yet</div>
        )}
      </div>
      <div className='eventField'>
        Add to favorite events:
        <div className='updateField'>
          <input
            className='eventInput'
            value={eventData.key}
            placeholder='Title'
            onChange={(event) =>
              setEventData({ ...eventData, key: event.target.value })
            }
          />
          <input
            className='eventInput'
            value={eventData.url}
            placeholder='Event url'
            onChange={(event) =>
              setEventData({ ...eventData, url: stripIdFromUrl(event.target.value) })
            }
          />
          <button onClick={addEvent}>+</button>
        </div>
        <div className='error'>{error}</div>
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
      <div className='buttonContainer'>
        <button onClick={logout}>Log out</button>
        <button onClick={removeAccount}>Remove account</button>
      </div>
    </div>
  )
}

export default Account
