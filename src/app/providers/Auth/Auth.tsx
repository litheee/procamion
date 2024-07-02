'use client'

import { useState, createContext, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { removeHeaderBearerToken, setHeaderBearerToken } from '@/shared/api'
import { deleteCookie, getCookie } from '@/shared/utils'
import { ROUTE_NAMES } from '../../../../config'

type AuthContextProps = {
  isAuth: boolean
  setAuth: (value: boolean) => void
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setAuth] = useState(false)
  const [isAuthInitializing, setAuthInitializing] = useState(true)

  const queryClient = useQueryClient()
  const router = useRouter()

  const checkAuth = () => {
    const accessToken = getCookie('accessToken')
    const refreshToken = getCookie('refreshToken')

    if (
      Boolean(accessToken) &&
      typeof accessToken === 'string' &&
      Boolean(refreshToken) &&
      typeof refreshToken === 'string'
    ) {
      setAuth(true)
      setHeaderBearerToken(accessToken)
    }

    setAuthInitializing(false)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const logout = () => {
    queryClient.removeQueries()
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
    localStorage.removeItem('userRole')
    removeHeaderBearerToken()
    setAuth(false)
    router.push(ROUTE_NAMES.SIGN_IN)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setAuth,
        logout
      }}
    >
      {!isAuthInitializing ? children : null}
    </AuthContext.Provider>
  )
}
