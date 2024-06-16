import React, { useState } from 'react'
import Navbar from '../Layout/Navbar'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../Context/auth'
import './Register.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassowrd] = useState('')
  const navigate = useNavigate()
  const [auth, setAuth] = useAuth()
  const location = useLocation()

  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8080/api/v1/auth/login', {
        email,
        password,
      })
      if (res && res.data.success) {
        toast.success(res.data && res.data.message)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        })
        localStorage.setItem('auth', JSON.stringify(res.data))
        navigate(location.state || '/')
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong')
    }
  }
  return (
    <>
      <Navbar />

      <div className="register">
        <h2>Login </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassowrd(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn"
              onClick={() => navigate('/forgot-password')}
            >
              Forget Passowrd
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Login
