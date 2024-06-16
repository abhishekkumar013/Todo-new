import React, { useState } from 'react'
import Navbar from '../Layout/Navbar'
import './Register.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [answer, setAnswer] = useState('')
  const navigate = useNavigate()

  let handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await axios.post(
        'http://localhost:8080/api/v1/auth/register',
        {
          name,
          email,
          password,
          answer,
        },
      )
      if (res && res.data.success) {
        toast.success(res.data.message)
        navigate('/login')
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error('Something Went Wrong')
    }
  }

  return (
    <>
      <Navbar />
      <div className="register">
        <h2>Registration Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAnswer" className="form-label">
              Birth Place
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputname"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Register
