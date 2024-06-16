import mongoose from 'mongoose'

const listSchema = new mongoose.Schema(
  {
    list: {
      type: String,
      require: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)
export default mongoose.model('List', listSchema)
