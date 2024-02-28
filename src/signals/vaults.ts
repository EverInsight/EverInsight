import { effect, signal } from '@preact/signals-react'
import { storage } from '../libs/storage'

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
  const vaults = storage.getString('vaults')

  if (vaults) return JSON.parse(vaults) as Vaults

  return defaultVaults
}

export const vaultsSignal = signal(getVaults())

effect(() => {
  console.debug('vaultsSignal', vaultsSignal.value)
  storage.set('vaults', JSON.stringify(vaultsSignal.value))
})
