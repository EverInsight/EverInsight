import { use } from '@/context'
import { Redirect, Stack, usePathname } from 'expo-router'

export default function () {
  const pathname = usePathname()
  const { system } = use()

  if (!system.file) {
    if (system.vault && pathname !== '/vaults/current') return <Redirect href='/vaults/current' />

    if (pathname !== '/welcome/') return <Redirect href='/welcome/' />
  }

  return <Stack />
}
