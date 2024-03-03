import Screen from '..'
import { render, screen } from '@testing-library/react-native'

test('renders correctly', () => {
  render(<Screen />)

  expect(screen.getByText('Create a new vault with demo data')).toBeDefined()
})
