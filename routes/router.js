const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

router.post('/auth/login', async (req, res) => {
  try {

    const user = await UserModel.find({email : req.body.email})

    if (!user) return res.json({error : 'user/password not found'}) //If user doesn't exist, send error


    if(bcrypt.compareSync(req.body.password, user.password)){

      const data = {user_id : user._id}
      jwt.sign(data, process.env.SECRET, {expiresIn : 60*60})

      res.json({token})
    }

  } catch (error) {
    console.error(error)
  }
})

module.exports = router