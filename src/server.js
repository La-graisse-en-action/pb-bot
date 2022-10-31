const express = require('express')
const log = require('./utils/logs')
const cors = require('cors')
const router = express.Router()

const server = express()
const port = process.env.PORT || 8000

// routes
router.get('/', (req, res, _next) => {
  res.json({
    msg: 'Hellow',
  })
})

// middlewares
server.use(cors())
server.use(router)

server.listen(port, () => {
  log.success(`Server on Port ${port}`)
})
