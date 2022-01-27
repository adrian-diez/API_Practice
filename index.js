process.stdout.write('x\x1B[2J\x1B[0f')

require('dotenv').config({path : '.local.env'})
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017',{
  dbName : 'test-api'
})
.then(() => {console.log('Connected to Mongo!')})
.catch(() => {console.log('Not Connected to Mongo!')})

const router = require('./routes/router')

const app = express()
app.use(morgan)
   .use(express.json())
   .get('/', (req, res) => {
     res.send('API alive!')
   })
   .use('/api', router)

app.listen(process.env.PORT, () =>{
  
  console.log(`Server running in: http://localhost:${process.env.PORT}`)
})
