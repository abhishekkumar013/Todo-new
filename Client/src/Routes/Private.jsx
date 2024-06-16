import { useEffect, useState } from 'react'
import { useAuth } from '../Context/auth'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import Spinner from '../assets/Spinner'

export default function PrivateRoute() {
  const [ok, setOk] = useState()
  const [auth, setAuth] = useAuth()

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get('http://localhost:8080/api/v1/auth/user-auth')
      if (res.data.ok) {
        setOk(true)
      } else {
        setOk(false)
      }
    }
    if (auth?.token) authCheck()
  }, [auth?.token])

  return ok ? <Outlet /> : <Spinner />
}
