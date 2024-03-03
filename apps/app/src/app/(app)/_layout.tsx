import { Redirect, Stack } from 'expo-router'
import { systemSignal } from '@/signals/system'

export default function () {
  if (!systemSignal.value.file) return <Redirect href='/welcome/' />

  return <Stack />
}
