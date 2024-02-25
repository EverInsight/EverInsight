module.exports = {
  preset: 'react-native',
  testRegex: '/*\\.test\\.tsx?$',
  transform: {
    '.(jsx|tsx?)': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|react-navigation|@react-navigation/.*)',
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'react-native/jest/assetFileTransformer.js',
  },
}
