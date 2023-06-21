import express from 'express'
import { createClient, deleteClient, getClientById, getClients } from '../middleware/clientsMiddleware';

const clientsRouter = express.Router()

/**
 * Route get the clients.
 * @openapi
 * /clients:
 *    get:
 *      summary: Route get the clients.
 *      description: Route get the clients.
 *      tags: [Clients]
 *      responses:
 *        "200":
 *          description: Returns an array of  client objects/docs.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/GetClientsRes"
 *        "400":
 *          description: An error occurred. Either a problem with the database or the server.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/ErrorRes"
 */
clientsRouter.get('/', getClients)


/**
 * Route to get a client by id.
 * @openapi
 * /clients/{id}:
 *    get:
 *      summary: Route to get a client by id.
 *      description: Route to get a client by id.
 *      tags: [Clients]
 *      parameters:
 *        - in: header
 *          name: id
 *          required: true
 *          example: 64932c2be10ded9ad6725e4a
 *      responses:
 *        "200":
 *          description: Returns the client object/doc which has the provided id.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Client"
 *        "400":
 *          description: An error occurred. Either a problem with the database, the server, the provided id not found or malformed request body.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/ErrorRes"
 */
clientsRouter.get('/:id', getClientById)


/**
 * Route to add a new client.
 * @openapi
 * /clients:
 *    post:
 *      summary: Route to add a new client.
 *      description: Route to add a new client.
 *      tags: [Clients]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/CreateClientReqBody"
 *      responses:
 *        "201":
 *          description: Returns the client object/doc that has been created.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Client"
 *        "400":
 *          description: An error occurred. Either a problem with the database, the server or malformed request body.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/ErrorRes"
 */
clientsRouter.post('/', createClient)

/**
 * Route to delete a client by id.
 * @openapi
 * /clients/{id}:
 *    delete:
 *      summary: Route to delete a client by id.
 *      description: Route to delete a client by id.
 *      tags: [Clients]
 *      parameters:
 *        - in: header
 *          name: id
 *          required: true
 *          example: 64932c2be10ded9ad6725e4a
 *      responses:
 *        "204":
 *          description: Returns success status response code that has no content.
 *        "400":
 *          description: An error occurred. Either a problem with the database, the server, the provided id not found or malformed request body.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/ErrorRes"
 */
clientsRouter.delete('/:id', deleteClient)


export default clientsRouter;