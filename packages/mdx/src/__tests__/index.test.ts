import { evaluateMdx } from '..'

it('should export evaluateSync', () => {
  expect(evaluateMdx('').toString()).toBe(`function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _jsx(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}`)
})
