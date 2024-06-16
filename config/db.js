import mongoose from 'mongoose'

// require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`connected to mongodb ${conn.connection.host}`)
  } catch (error) {
    console.log(`Error in MongoDB ${error}`)
  }
}
export default connectDB
