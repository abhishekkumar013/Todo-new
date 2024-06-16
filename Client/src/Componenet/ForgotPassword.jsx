import React, { useState } from 'react'
import Navbar from '../Layout/Navbar'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [answer, setAnswer] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        'http://localhost:8080/api/v1/auth/forgot-password',
        { email, answer, newpassword },
      )
      if (res && res.data.success) {
        toast.success(res.data.message)
        navigate('/login')
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went Wrong')
    }
  }

  return (
    <>
      <Navbar />
      <div className="register">
        <h2>Forgot Password</h2>
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
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAnswer" className="form-label">
              Answer
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

export default ForgotPassword
