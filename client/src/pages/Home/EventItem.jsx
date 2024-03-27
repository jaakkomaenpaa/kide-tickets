import Timer from '../../components/Timer'
import { stripIdFromUrl } from '../../utils'
import { useNavigate } from 'react-router-dom'

const EventItem = ({ event }) => {
  const navigate = useNavigate()

  // Will have some actual function later
  const reserve = async () => {
    navigate('/reserve')
  }

  return (
    <div className='favEventItem'>
      <span className='favEventHeader'>
        {event.key}
        <button className='favEventButton' onClick={reserve}>
          Reserve
        </button>
      </span>
      <a href={`https://kide.app/events/${stripIdFromUrl(event.url)}`}>Link</a>
      <Timer saleStartTime={new Date(event.saleStart)} />
    </div>
  )
}

export default EventItem
