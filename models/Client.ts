import mongoose, { Schema } from 'mongoose'

const clientSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    index: {
      unique: true,
      match: /.+\@.+\..+/,
      partialFilterExpression: { email: { $type: 'string' } },
    },
    default: null,
  },
  website: {
    type: String,
    default: null,
    required: false
  },
  businessId: {
    type: String,
    required: false,
    default: null
  },
  phone: {
    type: String,
    required: false,
    default: null
  },
  streetAddress: {
    street: {
      type: String,
      required: false,
      default: null
    },
    city: {
      type: String,
      required: false,
      default: null
    },
    postalCode: {
      type: Number,
      required: false,
      default: null
    }
  }
})

export default mongoose.model('Client', clientSchema)