const router = require('express').Router()
const bcrypt = require('bcrypt')

const UserModel = require('../models/user.model') 

// Signup route 
router.post('/signup', async (req, res) =>{
  try {
    const user = await UserModel.create(req.body)
    user.password = bcrypt.hashSync(user.password,process.env.HASH_ROUNDS)
    res.json(user)
  } catch (error) {
    console.error(error) 
  }
})

module.exports = router