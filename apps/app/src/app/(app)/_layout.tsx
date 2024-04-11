import { Redirect, Stack, usePathname } from 'expo-router'
import { systemSignal } from '@/signals/system'

export default function () {
  const pathname = usePathname()

  if (!systemSignal.value.file) {
    if (systemSignal.value.vault && pathname !== '/vaults/current') return <Redirect href='/vaults/current' />

    if (pathname !== '/welcome/') return <Redirect href='/welcome/' />
  }

  return <Stack />
}
