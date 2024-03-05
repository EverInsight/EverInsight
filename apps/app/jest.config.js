/** @type {import('jest').Config} */
module.exports = {
  displayName: 'app',
  preset: 'jest-expo',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@everinsight/mdx': '<rootDir>/../../packages/mdx/dist/index.es5.js',
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': require.resolve('react-native/jest/assetFileTransformer.js'),
  },
  clearMocks: true,
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  setupFilesAfterEnv: ['./jest.setup.ts'],
}
