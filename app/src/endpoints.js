const serverPath = 'api/v1'

const joinPath = (...segments) => segments.join('/').replace(/\/+/g, '/')

export const messagesUrl = () => joinPath(serverPath, 'messages')
export const channelsUrl = () => joinPath(serverPath, 'channels')
export const serverUrl = () => joinPath(serverPath)
export const createUserUrl = () => joinPath(serverPath, 'signup')
export const loginUrl = () => joinPath(serverPath, 'login')
