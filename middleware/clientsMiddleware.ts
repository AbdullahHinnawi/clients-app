import { Request, Response, NextFunction } from "express"
import Client from '../models/Client'
import logger from "../utils/logger"
import { IClientDocument } from "../types/types"


export const getClients = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    const clients: IClientDocument[] = await Client.find({})
    return res.status(200).json(clients).end()
  } catch (error: any) {
    logger.error("createClient error: ", error)
    return res.status(400).json({ error: error.message }).end()
  }
}

export const getClientById = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const client: IClientDocument | null = await Client.findById(req.params.id)

    if (!client) {
      return res.status(400).json({ error: `Client with id ${req.params.id} not found` })
    }
    return res.status(200).json(client).end()
  } catch (error: any) {
    logger.error("createClient error: ", error)
    return res.status(400).json({ error: error.message }).end()
  }
}

export const createClient = async (req: Request, res: Response, _next: NextFunction) => {

  try {
    const { body } = req

    let newClient = new Client({
      name: body.name,
      email: body.email,
      website: body.website,
      businessId: body.businessId
    })

    /*
    if (body.businessId) {
      const companyInfoResult = await getCompanyInfo(body.businessId)
      if (companyInfoResult.success) {

        const phone = companyInfoResult.data?.phone?.value
        const streetAddress: StreetAddress = {
          street: companyInfoResult.data?.streetAddress?.street?.value,
          city: companyInfoResult.data?.streetAddress?.city?.value,
          postalCode: companyInfoResult.data?.streetAddress?.postalCode?.value
        }
        newClient.phone = phone
        newClient.streetAddress = streetAddress

      }
    }
    */

    const createdClient = await newClient.save()
    return res.status(201).json(createdClient).end()

  } catch (error: any) {
    logger.error("createClient error: ", error)
    return res.status(400).json({ error: error.message }).end()
  }
}

export const deleteClient = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const client: IClientDocument | null = await Client.findById(req.params.id)
    if (!client) {
      return res.status(400).json({ error: `Client with id ${req.params.id} not found` })
    }

    await Client.findByIdAndDelete(req.params.id)
    return res.status(204).end()

  } catch (error: any) {
    logger.error("deleteClient error: ", error)
    return res.status(400).json({ error: error.message }).end()
  }
}