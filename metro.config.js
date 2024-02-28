const { getDefaultConfig } = require('@react-native/metro-config')

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname)

config.resetCache = true

config.resolver.unstable_enablePackageExports = true

module.exports = config
