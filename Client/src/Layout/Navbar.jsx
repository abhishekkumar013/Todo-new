import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/auth'
import './Navbar.css'
import toast from 'react-hot-toast'
import ListAltIcon from '@mui/icons-material/ListAlt'

const Navbar = () => {
  const [auth, setAuth] = useAuth()

  let handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: '',
    })
    localStorage.removeItem('auth')
    toast.success('Logout Successfully')
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <i class="fa-solid fa-list" style={{ color: '#ff0000' }}></i>{' '}
        <p>TODO</p>
      </div>

      <ul className="nav-menu">
        <li>
          <Link to={'/'} className="Link">
            Home
          </Link>
        </li>
      </ul>
      {!auth.user ? (
        <div className="nav-login-cart">
          <Link to={'/login'} className="Link">
            <button>Login</button>
          </Link>
          <Link to={'/register'} className="Link">
            <button>Sign Up</button>
          </Link>
        </div>
      ) : (
        <>
          <ul className="nav-menu">
            <li>
              <Link to={'/todo'} className="Link">
                Diary
              </Link>
            </li>
          </ul>
          <div className="nav-login-cart">
            <Link onClick={handleLogout} to={'/login'} className="Link">
              <button>Logout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default Navbar
