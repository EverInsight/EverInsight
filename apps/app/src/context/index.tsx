import { createSplitedContext } from '@faasjs/react'
import type { System } from './system'
import type { Theme } from './theme'
import type { Vaults } from './vaults'

export const { Provider, use } = createSplitedContext<{
  system: System
  setSystem: React.Dispatch<React.SetStateAction<System>>
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
  vaults: Vaults
  setVaults: React.Dispatch<React.SetStateAction<Vaults>>
}>({
  system: null,
  setSystem: null,
  theme: null,
  setTheme: null,
  vaults: null,
  setVaults: null,
})
