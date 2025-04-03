import { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { IAuthProvider, IContext, IUser } from './AuthTypes'
import { getCookie } from '../utils/cookies'

export const AuthContext = createContext<IContext>({} as IContext)
export const useAuthContext = () => useContext(AuthContext)

export function isTokenValid(token: string): { ui: string; exp: string } | boolean {
  try {
    const decodedToken: any = jwtDecode(token)

    if (decodedToken.exp * 1000 > Date.now()) {
      return { ui: decodedToken.id, exp: new Date(decodedToken.exp * 1000).toISOString() }
    }
  } catch (error) {
    return false
  }
  return false
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [loggedInfo, setLoggedInfo] = useState<IUser | null>(null)

  useEffect(() => {
    const userLogged: { ui: string; exp: string } | {} = isTokenValid(getCookie('_a_tc') as string)

    if (userLogged) {
      setLoggedInfo(userLogged)
    }
  }, [])

  const authenticate = async (email: string, password: string) => {
    try {
      const token = await fetch((process.env.REACT_APP_API_URL as string) + '/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => data.token)

      if (!token) {
        return {
          status: 'error',
        }
      }

      try {
        const decoded: any = jwtDecode(token)
        const expiresDate = new Date(decoded.exp * 1000).toUTCString()
        document.cookie = `_a_tc=${token}; expires=${expiresDate}; domain=localhost; Secure; Path=/`
        return {
          status: 'success',
          ui: decoded.id,
        }
      } catch (decodeError) {
        console.error('Erro ao decodificar o JWT:', decodeError)
        return {
          status: 'error',
        }
      }
    } catch (err) {
      console.error('Erro no login:', err)
      return {
        status: 'error',
      }
    }
  }

  const logout = () => {
    setLoggedInfo(null)
    sessionStorage.clear()
    const pastDate = new Date(0).toUTCString()
    document.cookie = `_a_tc=; expires=${pastDate}; domain=${process.env.REACT_APP_DOMINIO_COOKIE}; Secure; Path=/`
  }

  return (
    <AuthContext.Provider value={{ ...loggedInfo, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
