/** @type {import('jest').Config} */
module.exports = {
  projects: ['<rootDir>/apps/app/jest.config.js', '<rootDir>/packages/mdx/jest.config.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '/*\\.test\\.tsx?$',
}
