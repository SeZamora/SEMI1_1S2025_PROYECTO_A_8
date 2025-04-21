import cors from 'cors'
import express from 'express'
import { config } from '../config/config.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello Worldzzz!')
})

app.listen(config.port, () => {
  return console.log("Server is running on port " + config.port)
})
