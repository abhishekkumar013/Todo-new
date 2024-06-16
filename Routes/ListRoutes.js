import express from 'express'
import requireSignIn from '../middleware/authMiddleware.js'
import {
  craeteController,
  deleteController,
  getProductController,
} from '../Controller/ListController.js'
const router = express.Router()

//craete list
router.post('/create-list', requireSignIn, craeteController)

//get -list
router.get('/get-list/:userId', requireSignIn, getProductController)

//delete-routes
router.delete('/delete-list/:itemId', requireSignIn, deleteController)

export default router
