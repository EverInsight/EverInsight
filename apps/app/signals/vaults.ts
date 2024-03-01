import { effect, signal } from '@preact/signals-react'
import { get, set } from '@/libs/storage'

export type Vault = {
  version: string
  type: 'local'
  name: string
  path: string
}

export type Vaults = {
  version: string
  vaults: Record<string, Vault>
  currentVault?: string
}

const defaultVaults: Vaults = {
  version: '1',
  vaults: {},
}

function getVaults() {
  const vaults = get<Vaults>('vaults')

  if (vaults) return vaults

  return defaultVaults
}

export const vaultsSignal = signal(getVaults())

effect(() => {
  console.debug('vaultsSignal', vaultsSignal.value)
  set('vaults', vaultsSignal.value)
})
