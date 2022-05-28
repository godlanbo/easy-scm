import {
  setLocalStorage,
  removeLocalStorage,
  getLocalStorage,
} from './localStorage'

const tokenKey = 'Admin-token'
const userKey = 'User'

export function setToken(value) {
  return setLocalStorage(tokenKey, value, { exp: 3600 * 24 })
}

export function removeToken() {
  return removeLocalStorage(tokenKey)
}

export function getToken() {
  return getLocalStorage(tokenKey)
}

export function setUserCache(value) {
  return setLocalStorage(userKey, value, { exp: 3600 * 24 })
}

export function removeUserCache() {
  return removeLocalStorage(userKey)
}

export function getUserCache() {
  return getLocalStorage(userKey)
}

export function refreshUserCache(value) {
  return setLocalStorage(userKey, value, { exp: 3600 * 24 })
}
