import mongoose from 'mongoose'
import { env } from './env'

export async function connectDatabase(): Promise<void> {
  if (!env.mongoUri) {
    console.warn('MONGODB_URI is not configured. Skipping database connection for now.')
    return
  }

  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 15000,
    })
    console.log('MongoDB connected successfully.')
  } catch (error) {
    console.error('MongoDB connection failed. Continuing without database for now:', error)
  }
}
