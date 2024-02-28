module.exports = {
  preset: 'react-native',
  testRegex: '/*\\.test\\.tsx?$',
  transform: {
    '.m?(js|ts)x?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!.+\\.(js|jsx|ts|tsx)$)'],
  moduleNameMapper: {
    '\\.(css|less|sass|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'react-native/jest/assetFileTransformer.js',
    'estree-walker': '<rootDir>/node_modules/estree-walker/src/index.js',
    periscopic: '<rootDir>/node_modules/periscopic/src/index.js',
    'is-reference': '<rootDir>/node_modules/is-reference/src/index.js',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
}
