import app from './app'
import http from 'http'
import config from './utils/config'
import logger from './utils/logger'

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Node environment: ${config.NODE_ENV}`)
  logger.info(`Server is running at ${config.BASE_URI}`)
})