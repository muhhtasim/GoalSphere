import { Router } from 'express'
import { authService } from '../services/authService'

const router = Router()

router.post('/auth/register', async (req, res) => {
  const { email, password, name } = req.body as { email?: string; password?: string; name?: string }

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'email, password and name are required' })
  }

  try {
    const user = await authService.register(email, password, name)
    const token = authService.issueToken(user)

    return res.status(201).json({ data: { user, token } })
  } catch (error) {
    return res.status(409).json({ message: error instanceof Error ? error.message : 'Registration failed' })
  }
})

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body as { email?: string; password?: string }

  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' })
  }

  try {
    const user = await authService.login(email, password)
    const token = authService.issueToken(user)

    return res.json({ data: { user, token } })
  } catch (error) {
    return res.status(401).json({ message: error instanceof Error ? error.message : 'Login failed' })
  }
})

export default router
