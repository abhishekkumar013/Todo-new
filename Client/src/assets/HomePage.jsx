import React from 'react'
import Navbar from '../Layout/Navbar'
import { useAuth } from '../Context/auth'
// import { useContext } from 'react'
import './Homepage.css'

const HomePage = () => {
  // const [auth, setAuth] = useAuth()
  return (
    <>
      <Navbar />

      <div className="container">
        <img className="img" src="../../public/71BDH0hktcL._SL1500_.jpg" />
      </div>
    </>
  )
}

export default HomePage
