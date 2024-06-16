import express from 'express'
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
} from '../Controller/authController.js'

import requireSignIn from '../middleware/authMiddleware.js'

const router = express.Router()

//register route
router.post('/register', registerController)

//login route
router.post('/login', loginController)

//forgat-password
router.post('/forgot-password', forgotPasswordController)

//test
router.get('/test', requireSignIn, testController)

//protected routes
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true })
})

export default router
