import { comparePassword, hashpassword } from '../helpers/authHelpers.js'
import UserModels from '../models/UserModels.js'
import JWT from 'jsonwebtoken'

// Register Controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, answer } = req.body
    if (!name) {
      return res.send({ message: 'Username Required' })
    }
    if (!email) {
      return res.send({ message: 'Email is required' })
    }
    if (!password) {
      return res.send({ message: 'Passowrd is required' })
    }
    if (!answer) {
      return res.send({ message: 'Answer is required' })
    }
    const exisitinguser = await UserModels.findOne({ email })
    if (exisitinguser) {
      return res.status(200).send({
        success: false,
        message: 'Already Register',
        exisitinguser,
      })
    }
    const hashedPassowrd = await hashpassword(password)
    const user = await new UserModels({
      name,
      email,
      password: hashedPassowrd,
      answer,
    }).save()
    res.status(201).send({
      success: true,
      message: 'Register Successfully',
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Something Went Wrong',
      error,
    })
  }
}

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: 'Invalid email or password',
      })
    }
    const user = await UserModels.findOne({ email })
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Email is not registered',
      })
    }
    const response = await comparePassword(password, user.password)
    if (!response) {
      return res.status(500).send({
        success: false,
        message: 'Invalid Password',
      })
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    res.status(200).send({
      success: true,
      message: 'Login Successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Something went wrong',
      error,
    })
  }
}

//Forget Password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newpassword } = req.body
    if (!email) {
      res.status(400).send({ message: 'Email is require' })
    }
    if (!answer) {
      res.status(400).send({ message: 'Answer is require' })
    }
    if (!newpassword) {
      res.status(400).send({ message: 'New Password is require' })
    }
    let user = await UserModels.findOne({ email, answer })
    if (!user) {
      res.status(404).send({
        success: false,
        message: 'Wrong Answer Or Email',
      })
    }
    const newhashpassword = await hashpassword(newpassword)
    await UserModels.findByIdAndUpdate(user._id, { password: newhashpassword })

    res.status(200).send({
      success: true,
      message: 'Passowrd Reset Successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: 'Something Went Wrong',
      error,
    })
  }
}

//test
export const testController = (req, res) => {
  res.send('Protected Routes')
}
