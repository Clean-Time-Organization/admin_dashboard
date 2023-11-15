
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

export {getUserFL, getUserRole}
