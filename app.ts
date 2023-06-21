import express from 'express'
import cors from 'cors'
import config from './utils/config'
import middleware from './utils/middleware'
import logger from './utils/logger'
import { connectToDB } from './db'
import clientsRouter from './controllers/clients'
import swaggerUi from "swagger-ui-express"
import swaggerDocument from './docs/generateSwaggerDoc'


const app = express();

(async () => {
  logger.info('connecting to', config.MONGODB_URI)
  await connectToDB()
})();

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/clients', clientsRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app