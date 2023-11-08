import {Navigate} from 'react-router-dom'
import {ReactNode} from "react";
import {useAuth} from "./AuthProvider";

const SignOut = () => {
  const { signOut } = useAuth()
  signOut()
  return <Navigate to="/login" replace />
}

export default SignOut
