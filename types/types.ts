import { Document, Types } from "mongoose";

export type StreetAddress = {
  street: string,
  city: string,
  postalCode: number
}

export interface IClient {
  name: string,
  email?: string,
  website?: string,
  businessId?: string,
  phone?: number,
  streetAddress?: StreetAddress,
}

export interface IClientDocument extends Document, IClient {
  _id: Types.ObjectId,
}


