import { renderRouter, screen } from 'expo-router/testing-library'

test('renders correctly', () => {
  renderRouter(`${__dirname}/../../../app`, { initialUrl: '/welcome' })

  expect(screen.getByText('Create a new vault with demo data')).toBeDefined()
})
