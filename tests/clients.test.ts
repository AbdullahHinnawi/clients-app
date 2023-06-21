import mongoose from 'mongoose'
import request from 'supertest'
import app from '../app'
import Client from './../models/Client'
import { initialClients } from './helpers'

const api = request(app)

describe("clients", () => {

  beforeEach(async () => {
    await Client.deleteMany({})
    await Client.insertMany(initialClients);
  })

  test('get clients: expect response with status code 200', async () => {
    const response = await api.get('/api/clients')
    expect(response.status).toBe(200)
  })

  test('get clients: all client docs are returned', async () => {
    const response = await api.get('/api/clients')
    expect(response.body.length).toEqual(initialClients.length)
  })

  test('create client: a valid client object can be added', async () => {
    const newClient = {
      name: "client-3"
    }
    await api.post('/api/clients').send(newClient)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/clients')
    expect(response.body.length).toEqual(initialClients.length + 1)
  })

  test('create client: adding a client fails if the email is not unique', async () => {
    const newClient = {
      name: "client-4",
      email: initialClients[0].email
    }
    const response = await api.post('/api/clients').send(newClient)
    expect(response.status).toBe(400)
    expect(response.body.error).toContain("E11000 duplicate key error")
  })

  test('create client: name field is required to create a new client', async () => {
    const newClient = {
      email: "client-5@mail.com",
      website: "https://client-5.com"
    }
    const response = await api.post('/api/clients').send(newClient)
    expect(response.status).toBe(400)
    expect(response.body.error).toContain("Path `name` is required.")
  })

  test('delete client: expect response with status code 204', async () => {

    const clientsBeforeDeletionRes = await api.get('/api/clients')

    const deleteRes = await api.delete(`/api/clients/${clientsBeforeDeletionRes.body[0]._id}`)
    expect(deleteRes.status).toBe(204)

    const clientsAfterDeletionRes = await api.get('/api/clients')
    expect(clientsAfterDeletionRes.body.length).toEqual(clientsBeforeDeletionRes.body.length - 1)
  })

  test('get client by id: saved client can be retrieved successfully', async () => {

    const currentClientsRes = await api.get('/api/clients')
    const clientToRetrieveById = currentClientsRes.body[1]

    const getClientByIdRes = await api.get(`/api/clients/${clientToRetrieveById._id}`)
    expect(getClientByIdRes.status).toBe(200)
    expect(getClientByIdRes.body._id).toEqual(clientToRetrieveById._id)
    expect(getClientByIdRes.body.name).toEqual(clientToRetrieveById.name)
  })

  afterAll(() => {
    mongoose.connection.close()
  })

})