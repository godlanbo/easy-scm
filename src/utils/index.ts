export * from './typeit'
export * from './date'
export * from './constant'
export * from './route'
export * from './auth'
export * from './localStorage'

export function generateUrlSearch(queryObj: Record<string, any>): string {
  const urlSearch = new URLSearchParams()
  for (const key in queryObj) {
    urlSearch.append(key, queryObj[key])
  }
  return urlSearch.toString()
}

export function isString(val: unknown): val is string {
  return typeof val === 'string'
}
