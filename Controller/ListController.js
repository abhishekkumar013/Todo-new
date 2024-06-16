import ListModels from '../models/ListModels.js'
import mongoose from 'mongoose'

export const craeteController = async (req, res) => {
  try {
    const { list, user } = req.body
    if (!list) {
      return res.send({ message: 'Item required' })
    }
    if (!user) {
      return res.send({ message: 'Id requirred' })
    }
    const result = await new ListModels({ list, user }).save()

    if (result) {
      return res.status(200).send({
        success: true,
        result,
        message: 'Item Added',
      })
    } else {
      return res.status(404).send({
        success: false,
        message: 'Unable to Add List',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: 'Error in Adding List',
    })
  }
}
// get list by user id
export const getProductController = async (req, res) => {
  try {
    // const { userId } = req.params
    // const { userId } = req.body
    // const user = new mongoose.Types.ObjectId(userId)
    // console.log(user)
    console.log(req.params.userId)

    const allList = await ListModels.find({ user: req.params.userId })
    if (!allList || allList.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'Unable to find List',
      })
    }
    res.status(200).send({
      success: true,
      totalCount: allList.length,
      message: 'Item Fetch Successfully',
      allList,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: 'Error in geting List',
    })
  }
}

//delete item
export const deleteController = async (req, res) => {
  try {
    const response = await ListModels.findByIdAndDelete({
      _id: req.params.itemId,
    })
    if (response) {
      return res.status(200).send({
        success: true,
        message: 'Deleted successfully',
      })
    } else {
      return res.status(404).send({
        success: false,
        message: 'Error in Deleteing',
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Error in Deleting Data',
      error,
    })
  }
}
