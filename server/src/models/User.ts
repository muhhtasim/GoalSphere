import mongoose, { type Document, Schema } from 'mongoose'

export interface IUserDocument extends Document {
  email: string
  name: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const UserModel =
  mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema)
