import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './../styles/navbar.css'
import Reservation from '../pages/Reservation/Reservation'
import Help from '../pages/Help'
import Home from '../pages/Home'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Account from '../pages/Account'

const Navbar = () => {

  const [loggedUser, setLoggedUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggedUser(user)
    }
    else {
      setLoggedUser(null)
    }
  }, [])

  return (
    <Router>
      <div className='navbar'>
        <Link className='pageLink' to='/home'>Home</Link>
        <Link className='pageLink' to='/reserve'>Reservation</Link>
        {!loggedUser ? ( 
          <div>
            <Link className='pageLink' to='/log-in'>Log in</Link>
            <Link className='pageLink' to='/sign-up'>Sign up</Link>
          </div>) 
          : <Link className='pageLink' to='/my-account'>Account</Link>
        }
        <Link className='pageLink' to='/help'>Help</Link>
      </div>
      <div className='centerContent'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/reserve' element={<Reservation />} />
          <Route path='/log-in' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/help' element={<Help />} />
          <Route path='/my-account' element={<Account />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Navbar