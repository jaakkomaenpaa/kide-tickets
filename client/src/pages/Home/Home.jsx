import { useState, useEffect } from 'react'

import '../../styles/home.css'
import EventItem from './EventItem'

const Home = () => {
  const [favoriteEvents, setFavoriteEvents] = useState([])

  // Check for logged user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setFavoriteEvents(loggedUser.favoriteEvents)
    }
  }, [])

  if (!window.localStorage.getItem('loggedUser')) {
    return (
      <div>
        <p>Log in to make reserving easier and save events to watchlist</p>
        <p>Reserving tickets requires an access code to prevent overusage</p>
      </div>
    )
  }

  return (
    <div className='home'>
      <h4>Favorited events</h4>
      <div className='favEventList'>
        {favoriteEvents.map((event) => (
          <EventItem key={event._id} event={event}/>
        ))}
      </div>
    </div>
  )
}

export default Home
