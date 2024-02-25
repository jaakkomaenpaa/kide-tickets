import { useNavigate } from 'react-router-dom'

const Account = () => {

  const navigate = useNavigate()

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    navigate('/home')
    window.location.reload()
  }

  if (!window.localStorage.getItem('loggedUser')) {
    return <p>You have not logged in</p>
  }

  return (
    <>
      <div>Account</div>
      <button onClick={logout}>Log out</button>
    </>
  )
}

export default Account
