process.stdout.write('x\x1B[2J\x1B[0f')

require('dotenv').config({path : '.local.env'})
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan)
   .use(express.json())
   .get('/', (req, res) => {
     res.send('API alive!')
   })

app.listen(process.env.PORT, () =>{
  
  console.log(`Server running in: http://localhost:${process.env.PORT}`)
})
