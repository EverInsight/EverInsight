import { Dirs, FileSystem } from 'react-native-file-access'

/**
 * Create a directory in the vaults folder.
 *
 * @param path
 */
export async function mkdir(path: string) {
  console.debug('mkdir', path)

  const paths = `vaults/${path}`.split('/')

  for (let i = 1; i <= paths.length; i++) {
    const subPath = paths.slice(0, i).join('/')
    console.log(subPath)
    const exists = await FileSystem.exists(`${Dirs.DocumentDir}/${subPath}`)

    if (!exists) {
      console.debug('create folder', subPath)
      await FileSystem.mkdir(`${Dirs.DocumentDir}/${subPath}`)
    }
  }
}

/**
 * List the contents of the vaults folder.
 *
 * @param path
 */
export async function ls(path?: string) {
  console.debug('ls', path)

  if (!path) return await FileSystem.ls(`${Dirs.DocumentDir}/vaults`)

  return await FileSystem.ls(`${Dirs.DocumentDir}/vaults/${path}`)
}

/**
 * Write a file to the vaults folder.
 *
 * @param path
 */
export async function writeFile(path: string, data: string) {
  console.debug('writeFile', path, data)

  return await FileSystem.writeFile(`${Dirs.DocumentDir}/vaults/${path}`, data, 'utf8')
}
