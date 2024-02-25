import { Button, Text, View } from 'react-native'
import { SettingContext } from '../../contexts/setting'
import { useContext } from 'react'
import { Dirs, FileSystem } from 'react-native-file-access'

export function VaultsHomeScreen() {
  const setting = useContext(SettingContext)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Manage Vaults:</Text>
      <Text>{JSON.stringify(setting.setting.vaults)}</Text>
      <Button
        title='new Vault'
        onPress={() => {
          FileSystem.ls(Dirs.DocumentDir).then(files => {
            console.log(files)
            // setting.setSetting(prev => ({
            //   ...prev,
            //   vaults: {
            //     ...prev.vaults,
            //     [res.uri]: {
            //       type: 'local',
            //       name: res.name,
            //       path: res.uri,
            //     },
            //   },
            // }))
          })
        }}
      />
    </View>
  )
}
