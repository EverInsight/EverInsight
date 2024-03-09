import { evaluateMdx } from '..'

it('should filter out non-JSX elements.', () => {
  const result = evaluateMdx('<div></div>')

  expect(result.mdast).toMatchObject({
    type: 'root',
    children: [],
  })
})

it('should wrap text content', () => {
  expect(evaluateMdx('# h1\n\ntext').mdast.children).toMatchObject([
    {
      type: 'element',
      tagName: 'h1',
      properties: {},
      children: [{ type: 'text', value: 'h1' }],
    },
    {
      type: 'element',
      tagName: 'br',
      properties: {},
      children: null,
    },
    {
      type: 'element',
      tagName: 'p',
      properties: {},
      children: [
        {
          type: 'element',
          tagName: 'span',
          properties: {},
          children: [{ type: 'text', value: 'text' }],
        },
      ],
    },
  ])

  expect(evaluateMdx('`**Bold** __Bold__` => **Bold** __Bold__').mdast.children).toMatchObject([
    {
      type: 'element',
      tagName: 'p',
      properties: {},
      children: [
        {
          type: 'element',
          tagName: 'code',
          properties: {},
          children: [{ type: 'text', value: '**Bold** __Bold__' }],
        },
        { type: 'element', tagName: 'span', children: [{ type: 'text', value: ' => ' }] },
        { type: 'element', tagName: 'strong', properties: {}, children: [{ type: 'text', value: 'Bold' }] },
        { type: 'element', tagName: 'span', children: [{ type: 'text', value: ' ' }] },
        { type: 'element', tagName: 'strong', properties: {}, children: [{ type: 'text', value: 'Bold' }] },
      ],
    },
  ])
})

it('should wrap pure js content', () => {
  expect(evaluateMdx('{1+1}').mdast.children).toMatchObject([
    {
      type: 'element',
      tagName: 'span',
      properties: {},
      children: [{ type: 'mdxFlowExpression', value: '1+1' }],
    },
  ])
})

// it('should wrap jsx content', () => {
//   expect(
//     evaluateMdx('export const Cat = () => <img src="https://placekitten.com/200/200" />\n\n<Cat />').mdast.children
//   ).toMatchObject([
//     {
//       type: 'element',
//       tagName: 'div',
//       properties: {},
//       children: [{ type: 'text', value: 'text' }],
//     },
//   ])
// })
