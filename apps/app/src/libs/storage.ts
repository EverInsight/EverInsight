import * as Sqlite from 'expo-sqlite'

const db = Sqlite.openDatabaseSync('storage')

db.execSync('CREATE TABLE IF NOT EXISTS storage (key TEXT PRIMARY KEY, value TEXT)')

export function get<T = any>(key: string): T | undefined {
  const result = db.getFirstSync<{ value: string }>('SELECT value FROM storage WHERE key = ?', [key])

  if (result) return JSON.parse(result.value)

  return
}

export function set(key: string, value: any) {
  db.runSync('INSERT OR REPLACE INTO storage (key, value) VALUES (?, ?)', [key, JSON.stringify(value)])
}
