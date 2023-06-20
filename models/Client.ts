import mongoose, { Schema } from 'mongoose'

const clientSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    match: /.+\@.+\..+/,
    unique: true,
    required: false
  },
  website: {
    type: String,
    required: false
  },
  businessId: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  streetAddress: {
    street: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    postalCode: {
      type: Number,
      required: false
    }
  }
})

export default mongoose.model('Client', clientSchema)