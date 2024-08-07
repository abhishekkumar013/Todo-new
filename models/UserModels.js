import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    answer: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
)
export default mongoose.model('User', userSchema)
