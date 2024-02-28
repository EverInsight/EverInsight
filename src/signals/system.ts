import { storage } from '../libs/storage'
import { effect, signal } from '@preact/signals-react'

export type System = {
  version: string
  vault?: string
  file?: string
}

function getSystem() {
  const system = storage.getString('system')

  if (system) return JSON.parse(system) as System

  return { version: '1' }
}

export const systemSignal = signal(getSystem())

effect(() => {
  console.debug('systemSignal', systemSignal.value)
  storage.set('system', JSON.stringify(systemSignal.value))
})
