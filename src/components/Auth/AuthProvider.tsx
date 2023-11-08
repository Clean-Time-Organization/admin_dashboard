import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {AuthData} from "./AuthData";

const AuthContext = createContext(null as any)

const AuthProvider = ({children}: {children: ReactNode}) => {
  const initialState: AuthData = {
    accessLifetime: Number(localStorage.getItem("accessLifetime")) || 0,
    accessToken: localStorage.getItem("accessToken") || '',
    refreshLifetime: Number(localStorage.getItem("refreshLifetime")) || 0,
    refreshToken: localStorage.getItem("refreshToken") || '',
    tokenType: localStorage.getItem("tokenType") || ''
  }

  const [authData, setAuthDataState] = useState(initialState)

  const signIn = (authData: AuthData) => {
    if (authData.accessToken) {
      localStorage.setItem("accessLifetime", authData.accessLifetime.toString())
      localStorage.setItem("accessToken", authData.accessToken)
      localStorage.setItem("refreshLifetime", authData.refreshLifetime.toString())
      localStorage.setItem("refreshToken", authData.refreshToken)
      localStorage.setItem("tokenType", authData.tokenType)
    }

    setAuthDataState(authData)
  }

  const signOut = () => {
    localStorage.removeItem("accessLifetime")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshLifetime")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("tokenType")

    setAuthDataState(initialState)
  }

  const contextValue = useMemo(
    () => ({
      authData,
      signIn,
      signOut,
    }),
    [authData]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
