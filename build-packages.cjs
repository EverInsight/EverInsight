const { version } = require('./package.json')
const { execSync } = require('node:child_process')

for (const name of [
  'mdx'
]) {
  execSync(`npm pack -w packages/${name}`, {
    stdio: 'inherit',
  })

  execSync(`npm install ${__dirname}/everinsight-${name}-1.0.0.tgz -w apps/app`, {
    stdio: 'inherit',
  })
}
