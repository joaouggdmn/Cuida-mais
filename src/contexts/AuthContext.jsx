import { createContext, useCallback, useMemo, useState } from 'react'
import { getSessionUser, loginUser, logoutUser, registerUser } from '@/features/auth/services/authStorage'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSessionUser)

  const register = useCallback(async (data) => {
    const newUser = await registerUser(data)
    setUser(newUser)
    return newUser
  }, [])

  const login = useCallback(async (credentials) => {
    const loggedUser = await loginUser(credentials)
    setUser(loggedUser)
    return loggedUser
  }, [])

  const logout = useCallback(() => {
    logoutUser()
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, register, login, logout }), [user, register, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
