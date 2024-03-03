import {
  documentDirectory,
  getInfoAsync,
  makeDirectoryAsync,
  readDirectoryAsync,
  writeAsStringAsync,
  readAsStringAsync,
} from 'expo-file-system'

/**
 * Create a directory in the vaults folder.
 *
 * @param path
 */
export async function mkdir(path: string) {
  console.debug('mkdir', path)

  const fullpath = `${documentDirectory}vaults/${path}`

  const info = await getInfoAsync(fullpath)

  if (!info.exists) {
    console.debug('create folder', fullpath)
    await makeDirectoryAsync(fullpath, { intermediates: true })
  }
}

/**
 * List the contents of the vaults folder.
 *
 * @param path
 */
export async function ls(path?: string) {
  console.debug('ls', path)

  if (!path) return await readDirectoryAsync(`${documentDirectory}vaults`)

  return await readDirectoryAsync(`${documentDirectory}vaults/${path}`)
}

/**
 * Write a file to the vaults folder.
 *
 * @param path
 */
export async function writeFile(path: string, data: string) {
  console.debug('writeFile', path, data)

  return await writeAsStringAsync(`${documentDirectory}vaults/${path}`, data, { encoding: 'utf8' })
}

/**
 * Read a file from the vaults folder.
 *
 * @param path
 */
export async function readFile(path: string) {
  console.debug('readFile', path)

  return await readAsStringAsync(`${documentDirectory}vaults/${path}`, { encoding: 'utf8' })
}
