import { createContext } from 'react'
import { type Setting, getSetting } from '../libs/storage'

export const SettingContext = createContext<{
  setting: Setting
  setSetting: React.Dispatch<React.SetStateAction<Setting>>
}>({
  setting: getSetting(),
  setSetting: (_: Setting | ((prev: Setting) => Setting)) => {},
})
