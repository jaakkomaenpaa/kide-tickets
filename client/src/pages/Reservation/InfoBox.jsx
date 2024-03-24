import Timer from '../../components/Timer'

const InfoBox = ({ statusList, saleStartTime }) => {
  return (
    <div className='infoBox'>
      <h4>Important</h4>
      <p className='infoText'>
        Refreshing the page or navigating to the other pages of this app will
        stop the reservation process.
      </p>
      {saleStartTime !== null ? <Timer saleStartTime={saleStartTime} /> : null}
      <div className='statusList'>
        {statusList.map((message) => (
          <div key={message}>{message}</div>
        ))}
      </div>
    </div>
  )
}

export default InfoBox
