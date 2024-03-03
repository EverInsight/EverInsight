import { renderRouter, screen } from 'expo-router/testing-library'
import Screen from '../_layout'

const router = {
  '/index': Screen,
}

it('should redirect to /welcome/ if systemSignal.value.file is not set', () => {
  renderRouter(router, { initialUrl: '/' })

  expect(screen).toHavePathname('/welcome')
})
