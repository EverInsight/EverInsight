import type { Transformer } from 'unified'
import type { Root } from 'mdast'
import { visit, SKIP } from 'unist-util-visit'

/**
 * Filter out non-JSX elements.
 */
export function filter(): Transformer<Root, Root> {
  return function (tree) {
    visit(tree, 'mdxJsxFlowElement', (node, index, parent) => {
      if (node.type !== 'mdxJsxFlowElement') return

      if (node.name[0] === node.name[0].toUpperCase()) return

      parent.children.splice(index, 1, ...node.children)
      return [SKIP, index]
    })

    return tree
  }
}
