import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {AuthData} from "./AuthData";

const AuthContext = createContext(null as any)

const AuthProvider = ({children}: {children: ReactNode}) => {
  // State to hold the authentication data
  const [authData, setAuthDataState] = useState(null as any)

  // Function to set the authentication data
  const setAuthData = (authData: AuthData) => {
    setAuthDataState(authData)
  }

  useEffect(() => {
    if (authData) {
      localStorage.setItem('accessLifetime', authData.accessLifetime)
      localStorage.setItem('accessToken', authData.accessToken)
      localStorage.setItem('refreshLifetime', authData.refreshLifetime)
      localStorage.setItem('refreshToken', authData.refreshToken)
      localStorage.setItem('tokenType', authData.tokenType)
    } else {
      localStorage.removeItem("accessLifetime")
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshLifetime")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("tokenType")
    }
  }, [authData])

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      authData,
      setAuthData,
    }),
    [authData]
  )

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthProvider
