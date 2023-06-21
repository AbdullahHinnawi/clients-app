import express from 'express'
import { createClient, deleteClient, getClientById, getClients } from '../middleware/clientsMiddleware';

const clientsRouter = express.Router()

clientsRouter.get('/', getClients)
clientsRouter.get('/:id', getClientById)
clientsRouter.post('/', createClient)
clientsRouter.delete('/:id', deleteClient)


export default clientsRouter;