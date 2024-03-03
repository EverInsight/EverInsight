/** @type {import('jest').Config} */
module.exports = {
  displayName: 'mdx',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  transformIgnorePatterns: [],
  moduleNameMapper: {
    'estree-walker': '<rootDir>/../../node_modules/estree-walker/src/index.js',
    periscopic: '<rootDir>/../../node_modules/periscopic/src/index.js',
    'is-reference': '<rootDir>/../../node_modules/is-reference/src/index.js',
  },
}
