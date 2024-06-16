import bcrypt from 'bcrypt'

export const hashpassword = async (password) => {
  try {
    const saltRound = 10
    const hashpassword = await bcrypt.hash(password, saltRound)
    return hashpassword
  } catch (error) {
    console.log(error)
  }
}
export const comparePassword = async (password, hashedPassowrd) => {
  return bcrypt.compare(password, hashedPassowrd)
}
