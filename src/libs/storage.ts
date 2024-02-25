import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

export type Vault = {
  type: 'local'
  name: string
  path: string
}

export type Setting = {
  version: string
  vaults: Record<string, Vault>
  currentVault?: string
}

const defaultSetting: Setting = {
  version: '1',
  vaults: {},
}

export function getSetting() {
  const setting = storage.getString('setting')

  if (setting) return JSON.parse(setting) as Setting

  return defaultSetting
}

export function setSetting(setting: Setting) {
  storage.set('setting', JSON.stringify(setting))
}
