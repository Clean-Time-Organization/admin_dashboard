import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {AuthLocalStorageData} from "./AuthLocalStorageData";
import {useAppDispatch} from "../../store/hooks";
import {initialAuthDataState, setAuthData} from "../../store/features/authDataSlice";

const AuthContext = createContext(null as any)

const AuthProvider = ({children}: {children: ReactNode}) => {
  const dispatch = useAppDispatch()

  const initialState: AuthLocalStorageData = {
    accessLifetime: Number(localStorage.getItem("accessLifetime")) || 0,
    accessToken: localStorage.getItem("accessToken") || '',
    refreshLifetime: Number(localStorage.getItem("refreshLifetime")) || 0,
    refreshToken: localStorage.getItem("refreshToken") || '',
    tokenType: localStorage.getItem("tokenType") || ''
  }

  const [authData, setAuthDataState] = useState(initialState)

  const signIn = (authData: AuthLocalStorageData) => {
    setAuthDataState(initialState)

    if (authData.accessToken) {
      const user = parseJwt(authData.accessToken)
      localStorage.setItem("accessLifetime", authData.accessLifetime.toString())
      localStorage.setItem("accessToken", authData.accessToken)
      localStorage.setItem("refreshLifetime", authData.refreshLifetime.toString())
      localStorage.setItem("refreshToken", authData.refreshToken)
      localStorage.setItem("tokenType", authData.tokenType)

      setAuthDataState(authData)
      dispatch(setAuthData({
        email: 'test@email.com',
        firstName: 'FirstName',
        lastName: 'LastName',
      }))
    }
  }

  const signOut = () => {
    localStorage.removeItem("accessLifetime")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshLifetime")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("tokenType")

    setAuthDataState(initialState)
    dispatch(setAuthData(initialAuthDataState))
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

function parseJwt (token: string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
