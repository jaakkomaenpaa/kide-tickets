import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import './../styles/navbar.css'
import Reservation from '../pages/Reservation/Reservation'
import Help from '../pages/Help'
import Home from '../pages/Home'

const Navbar = () => {
  return (
    <Router>
      <div className='navBar'>
        <Link className='pageLink' to='/home'>Home</Link>
        <Link className='pageLink' to='/reserve'>Reservation</Link>
        <Link className='pageLink' to='/log-in'>Log in</Link>
        <Link className='pageLink' to='/sign-up'>Sign up</Link>
        <Link className='pageLink' to='/help'>Help</Link>
      </div>
      <div className='centerContent'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/reserve' element={<Reservation />} />
          <Route path='/log-in' element={<div>Yet to be implemented</div>} />
          <Route path='/sign-up' element={<div>Yet to be implemented</div>} />
          <Route path='/help' element={<Help />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Navbar