const files: Record<string, any> = {}

export async function mkdir(path: string) {
  console.debug('mocked mkdir', path)

  files[path] = {}
}

export async function ls(path?: string) {
  console.debug('mocked ls', path)
  return Object.keys(files).filter(file => file.startsWith(path || ''))
}

export async function writeFile(path: string, data: string) {
  console.debug('mocked writeFile', path, data)

  files[path] = data
}

export async function readFile(path: string) {
  console.debug('mocked readFile', path)

  return files[path]
}
