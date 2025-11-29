'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, UserRole } from '@/types/user.types'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, role?: UserRole) => Promise<void>
  logout: () => Promise<void>
  updateRole: (role: UserRole) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // TODO: Implement Neon Auth check
      // const response = await fetch('/api/auth/me')
      // if (response.ok) {
      //   const userData = await response.json()
      //   setUser(userData)
      // }
      setIsLoading(false)
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement Neon Auth login
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      // const data = await response.json()
      // setUser(data.user)
      console.log('Login:', email)
    } catch (error) {
      throw new Error('Login failed')
    }
  }

  const signup = async (email: string, password: string, role?: UserRole) => {
    try {
      // TODO: Implement Neon Auth signup
      console.log('Signup:', email, role)
    } catch (error) {
      throw new Error('Signup failed')
    }
  }

  const logout = async () => {
    try {
      // TODO: Implement Neon Auth logout
      setUser(null)
    } catch (error) {
      throw new Error('Logout failed')
    }
  }

  const updateRole = async (role: UserRole) => {
    if (!user) return
    try {
      // TODO: Implement role update
      setUser({ ...user, role })
    } catch (error) {
      throw new Error('Role update failed')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateRole
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
