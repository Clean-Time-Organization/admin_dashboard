import {Navigate} from 'react-router-dom'
import {ReactNode} from "react";
import {useAuth} from "./AuthProvider";

const RequireAuth = ({children}: {children: ReactNode}) => {
  const { authData } = useAuth()

  if (!authData.accessToken) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

export default RequireAuth
