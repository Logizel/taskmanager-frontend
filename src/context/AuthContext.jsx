import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import api from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [tokens, setTokens] = useState(() => {
    const stored = localStorage.getItem('tokens')
    return stored ? JSON.parse(stored) : null
  })
  const isAuthenticated = !!tokens?.access

  useEffect(() => {
    if (tokens) localStorage.setItem('tokens', JSON.stringify(tokens))
    else localStorage.removeItem('tokens')
  }, [tokens])

  const login = async (username, password) => {
    try {
      const { data } = await api.post('/auth/token/', { username, password })
      setTokens(data)
      return data
    } catch (error) {
      console.error('Login API error:', error)
      throw error
    }
  }

  const register = async (username, email, password) => {
    try {
      await api.post('/auth/register/', { username, email, password })
      return login(username, password)
    } catch (error) {
      console.error('Register API error:', error)
      throw error
    }
  }

  const logout = () => setTokens(null)

  const value = useMemo(() => ({ tokens, setTokens, isAuthenticated, login, logout, register }), [tokens, isAuthenticated])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


