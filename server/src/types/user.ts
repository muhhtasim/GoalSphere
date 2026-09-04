export interface UserRecord {
  id: string
  email: string
  name: string
  passwordHash: string
  createdAt: string
}

export interface AuthenticatedUser {
  id: string
  email: string
  name: string
}
