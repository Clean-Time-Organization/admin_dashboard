
const getUserFL = (firstName: string, lastName: string) => {
  let result: string[] = []
  firstName && result.push(firstName.charAt(0).toUpperCase())
  lastName && result.push(lastName.charAt(0).toUpperCase())
  return result.join('')
}

export {getUserFL}
