import logger from './logger'
import { Request, Response, NextFunction } from "express"

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: any, _req: Request, res: Response, next: NextFunction) => {
  logger.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  return next(error)
}

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}