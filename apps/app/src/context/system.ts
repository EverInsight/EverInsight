import { get, set } from '@/libs/storage'

export type System = {
  version: string
  vault?: string
  file?: string
}

export function loadSystem() {
  const system = get<System>('system')

  if (system) return system

  return { version: '1' }
}

export function saveSystem(value: System) {
  if (!value) return

  set('system', value)
}
