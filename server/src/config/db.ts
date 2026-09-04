import mongoose from 'mongoose'
import { env } from './env'

export async function connectDatabase(): Promise<void> {
  if (!env.mongoUri) {
    console.warn('MONGODB_URI is not configured. Skipping database connection for now.')
    return
  }

  try {
    await mongoose.connect(env.mongoUri)
    console.log('MongoDB connected successfully.')
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    throw error
  }
}
