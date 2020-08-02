import tokenService from './tokenService'

function getUser() {
  return tokenService.getUserFromToken();
}

const logout = () => {
  return tokenService.removeToken()
}

export default {
  getUser,
  logout
}