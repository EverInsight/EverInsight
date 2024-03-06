import { evaluateMdx } from '..'

it('should export evaluateSync', () => {
  const result = evaluateMdx('')

  expect(result.toString()).toBe(`function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}`)
  expect(result.mdast).toEqual({
    type: 'root',
    position: {
      end: {
        column: 1,
        line: 1,
        offset: 0,
      },
      start: {
        column: 1,
        line: 1,
        offset: 0,
      },
    },
    children: [],
  })
})
