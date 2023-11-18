import {useCallback, useEffect} from "react";

const getUserFL = (firstName: string, lastName: string) => {
  let result: string[] = []
  firstName && result.push(firstName.charAt(0).toUpperCase())
  lastName && result.push(lastName.charAt(0).toUpperCase())
  return result.join('')
}

const getUserRole = (role: string) => {
  if (role === "POS") {
    return "POS Operator"
  }
  return role
}

const useDebounce = (effect: any, dependencies: any, delay: number) => {
  const callback = useCallback(effect, dependencies)

  useEffect(() => {
    const timeout = setTimeout(callback, delay)
    return () => clearTimeout(timeout)
  }, [callback, delay])
}

export {getUserFL, getUserRole, useDebounce}

