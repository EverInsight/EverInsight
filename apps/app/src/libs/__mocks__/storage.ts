const storage: Record<string, any> = {}

export function get<T = any>(key: string): T | undefined {
  console.debug('mocked get', key)

  return storage[key]
}

export function set(key: string, value: any) {
  console.debug('mocked set', key, value)

  storage[key] = value
}
