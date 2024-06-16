import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

import connectDB from './config/db.js'
import authRoutes from './Routes/authRoutes.js'
import ListRoutes from './Routes/ListRoutes.js'

//config env
dotenv.config()

//connect db
connectDB()

//rest object
const app = express()
//middleware
app.use(cors())
app.use(express.json())

app.use(morgan('start'))

app.use('/api/v1/auth/', authRoutes)
app.use('/api/v1/lists/', ListRoutes)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server start at port ${PORT}`)
})
