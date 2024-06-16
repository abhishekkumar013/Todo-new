import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Spinner = () => {
  const [count, setCout] = useState(5)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      setCout((prevValue) => --prevValue)
    }, 1000)

    count == 0 &&
      navigate('/login', {
        state: location.pathname,
      })

    return () => clearInterval(interval)
  }, [count, navigate, location])
  return (
    <div
      className="d-flex justify-content-center align-items-center text-danger "
      style={{ height: '70vh' }}
    >
      <h1 className="Text-center">
        redirecting you within {count}sec to Login Page
      </h1>{' '}
      &nbsp; &nbsp;
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  )
}

export default Spinner
