import { evaluateMdx } from '..'

it('should filter out non-JSX elements.', () => {
  const result = evaluateMdx('<div></div>')

  expect(result.mdast).toMatchObject({
    type: 'root',
    children: [],
  })
})
