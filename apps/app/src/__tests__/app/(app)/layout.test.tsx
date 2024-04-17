import { renderRouter, screen } from 'expo-router/testing-library'

it('should redirect to /welcome/', () => {
  renderRouter(`${__dirname}/../../../app`)

  expect(screen).toHavePathname('/welcome')
})
