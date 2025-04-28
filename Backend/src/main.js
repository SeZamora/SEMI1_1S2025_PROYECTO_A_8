import cors from 'cors'
import express from 'express'
import { config } from '../config/config.js'
import filesRouter from './routes/filesRoutes.js'

const app = express()

app.use(express.json({ limit: '10mb' }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/files', filesRouter)

app.listen(config.port, () => {
  return console.log("Server is running on port " + config.port)
})
