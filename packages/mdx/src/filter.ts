import { visit, SKIP } from 'unist-util-visit'

/**
 * Filter out non-JSX elements.
 */
export function filter() {
  return function (tree) {
    visit(tree, 'mdxJsxFlowElement', (node, index, parent) => {
      if (node.name[0] === node.name[0].toUpperCase()) return

      parent.children.splice(index, 1, ...node.children)

      return [SKIP, index]
    })

    visit(tree, 'mdxJsxTextElement', (node, index, parent) => {
      if (node.name[0] === node.name[0].toUpperCase()) return

      parent.children.splice(index, 1, ...node.children)

      return [SKIP, index]
    })

    visit(tree, 'text', (node, index, parent) => {
      // console.log(node, parent)

      if (parent.type === 'element' && parent.tagName !== 'p') return

      if (node.value === '\n') {
        parent.children.splice(index, 1, {
          type: 'element',
          tagName: 'br',
          properties: {},
          children: null,
        })
        return
      }

      parent.children.splice(index, 1, {
        type: 'element',
        tagName: 'span',
        properties: {},
        children: [node],
      })
    })

    return tree
  }
}
