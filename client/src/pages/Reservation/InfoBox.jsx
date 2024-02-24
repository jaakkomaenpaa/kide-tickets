const InfoBox = ({ statusMessage }) => {
  return (
    <div className='infoBox'>
      <h4>Important</h4>
      <p className='infoText'>
        Refreshing the page or navigating to the other pages of this app will
        stop the reservation process.
      </p>
      {statusMessage}
    </div>
  )
}

export default InfoBox