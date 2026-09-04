import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { UserModel } from '../models/User'
import type { AuthenticatedUser, UserRecord } from '../types/user'

export class AuthService {
  async register(email: string, password: string, name: string): Promise<AuthenticatedUser> {
    const normalizedEmail = email.trim().toLowerCase()
    const existing = await UserModel.findOne({ email: normalizedEmail })

    if (existing) {
      throw new Error('User already exists')
    }

    const passwordHash = bcrypt.hashSync(password, 10)
    const user = await UserModel.create({
      email: normalizedEmail,
      name,
      passwordHash,
    })

    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
    }
  }

  async login(email: string, password: string): Promise<AuthenticatedUser> {
    const normalizedEmail = email.trim().toLowerCase()
    const user = await UserModel.findOne({ email: normalizedEmail })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const valid = bcrypt.compareSync(password, user.passwordHash)
    if (!valid) {
      throw new Error('Invalid credentials')
    }

    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
    }
  }

  issueToken(user: AuthenticatedUser): string {
    return jwt.sign({ sub: user.id, email: user.email, name: user.name }, env.jwtSecret, {
      expiresIn: '7d',
    })
  }

  verifyToken(token: string): AuthenticatedUser {
    const payload = jwt.verify(token, env.jwtSecret) as { sub: string; email: string; name: string }

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    }
  }
}

export const authService = new AuthService()
