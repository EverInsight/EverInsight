import { createContext } from 'react'
import { storage } from '../libs/storage'

export type System = {
  version: string
  vault?: string
  file?: string
}

export function getSystem() {
  const system = storage.getString('system')

  if (system) return JSON.parse(system) as System

  return { version: '1' }
}

export function saveSystem(system: System) {
  storage.set('system', JSON.stringify(system))
}

export const SystemContext = createContext<{
  system: System
  setSystem: React.Dispatch<React.SetStateAction<System>>
}>({
  system: {
    version: '1',
  },
  setSystem: (_: System | ((prev: System) => System)) => {},
})
