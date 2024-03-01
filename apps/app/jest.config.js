/** @type {import('jest').Config} */
module.exports = {
  displayName: 'app',
  preset: 'jest-expo',
  testRegex: '/*\\.test\\.tsx?$',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
}
