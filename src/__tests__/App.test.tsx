import { App } from '../App'
import { render, screen } from '@testing-library/react-native'

it('renders correctly', () => {
  render(<App />)

  expect(screen.getByText('Init a new Vault')).toBeTruthy()
})
