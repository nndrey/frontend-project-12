const serverPath = 'api/v1'
const joinPath = (...segments) => segments.join('/').replace(/\/+/g, '/')
const mainPagePath = '/'
const loginPagePath = '/login'
const signUpPagePath = '/signup'

export default {
  messagesUrl: () => joinPath(serverPath, 'messages'),
  channelsUrl: () => joinPath(serverPath, 'channels'),
  serverUrl: () => joinPath(serverPath),
  createUserUrl: () => joinPath(serverPath, 'signup'),
  loginUrl: () => joinPath(serverPath, 'login'),
  appUrl: () => mainPagePath,
  mainPagePath: () => mainPagePath,
  loginPagePath: () => loginPagePath,
  signUpPagePath: () => signUpPagePath,
}
