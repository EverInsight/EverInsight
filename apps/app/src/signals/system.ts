import { get, set } from '@/libs/storage'
import { effect, signal } from '@preact/signals-react'

export type System = {
  version: string
  vault?: string
  file?: string
}

function getSystem() {
  const system = get<System>('system')

  if (system) return system

  return { version: '1' }
}

export const systemSignal = signal(getSystem())

effect(() => {
  console.debug('systemSignal', systemSignal.value)
  set('system', systemSignal.value)
})
