import { render, screen } from '@testing-library/react-native'
import { Mdx } from '..'

describe('Mdx', () => {
  it('should render p', () => {
    render(<Mdx content='Hello World' />)

    expect(screen.toJSON()).toMatchObject({
      type: 'Text',
      children: ['Hello World'],
    })
  })

  it('should render h1', () => {
    render(<Mdx content='# h1' />)

    expect(screen.toJSON()).toMatchObject({
      type: 'Text',
      children: ['h1'],
    })
  })
})
