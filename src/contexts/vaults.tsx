import { createContext } from 'react'
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

export function getVaults() {
  const vaults = storage.getString('vaults')

  if (vaults) return JSON.parse(vaults) as Vaults

  return defaultVaults
}

export function setVaults(vaults: Vaults) {
  storage.set('vaults', JSON.stringify(vaults))
}

export const VaultsContext = createContext<{
  vaults: Vaults
  setVaults: React.Dispatch<React.SetStateAction<Vaults>>
}>({
  vaults: defaultVaults,
  setVaults: (_: Vaults | ((prev: Vaults) => Vaults)) => {},
})
