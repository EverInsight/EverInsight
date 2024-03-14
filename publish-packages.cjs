const { version } = require('./package.json')
const { execSync } = require('node:child_process')
// const { readFileSync, writeFileSync } = require('node:fs')

const newVersion = `${version}-devel-${Date.now()}`

for (const name of [
  'mdx'
]) {
  // const packagePath = `${__dirname}/packages/${name}/package.json`

  // const pkg = JSON.parse(readFileSync(packagePath).toString())
  // pkg.version = newVersion

  // writeFileSync(packagePath, JSON.stringify(pkg, null, 2))

  execSync(`npm pack -w packages/${name}`, {
    stdio: 'inherit',
  })

  // execSync(`rm -rf ${__dirname}/node_modues/${pkg.name}`, {
  //   stdio: 'inherit',
  // })

  execSync(`npm install ${__dirname}/everinsight-${name}-1.0.0.tgz -w apps/app`, {
    stdio: 'inherit',
  })
}
