import {useCallback, useEffect} from "react";
import {matchPath} from "react-router-dom";

const getUserFL = (firstName: string, lastName: string) => {
  let result: string[] = []
  firstName.trim() && result.push(firstName.trim().charAt(0).toUpperCase())
  lastName.trim() && result.push(lastName.trim().charAt(0).toUpperCase())
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

const useRouteMatch = (patterns: readonly string[], usePattern = false) => {
  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i]
    let possibleMatch = null
    if (usePattern) {
      possibleMatch = matchPath({path: pattern}, location.pathname)
    } else {
      possibleMatch = matchPath(pattern, location.pathname)
    }
    if (possibleMatch !== null) {
      return possibleMatch
    }
  }

  return null
}

export {getUserFL, getUserRole, useDebounce, useRouteMatch}

