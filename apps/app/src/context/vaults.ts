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

export function loadVaults() {
  const vaults = get<Vaults>('vaults')

  if (vaults) return vaults

  return defaultVaults
}

export function saveVaults(value: Vaults) {
  if (!value) return

  set('vaults', value)
}
