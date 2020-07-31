import tokenService from './tokenService'

function getUser() {
  console.log('getting user...')
  return tokenService.getUserFromToken();
}

const logout = () => {
  return tokenService.removeToken()
}

export default {
  getUser,
  logout
}