import * as esbuild from 'esbuild'
import { join } from 'node:path'
import { URL } from 'node:url'
import { execSync } from 'child_process'
import { transformSync, minifySync } from '@swc/core'
import { readFileSync, writeFileSync } from 'node:fs'

const node_modules = join(new URL('.', import.meta.url).pathname, '..', '..', 'node_modules')

const Plugin = {
  name: 'fix-path',
  setup(build) {
    build.onResolve({ filter: /vfile\/do-not-use-conditional-minpath/ }, () => ({
      path: join(node_modules, 'vfile/lib/minpath.browser.js'),
    }))
    build.onResolve({ filter: /vfile\/do-not-use-conditional-minproc/ }, () => ({
      path: join(node_modules, 'vfile/lib/minproc.browser.js'),
    }))
    build.onResolve({ filter: /vfile\/do-not-use-conditional-minurl/ }, () => ({
      path: join(node_modules, 'vfile/lib/minurl.browser.js'),
    }))
    build.onEnd(res => {
      if (res.errors.length > 0) return

      execSync('tsc')

      const code = transformSync(readFileSync('dist/index.js').toString(), {
        jsc: {
          target: 'es5',
        },
        sourceMaps: true,
      })

      writeFileSync('dist/index.es5.js', code.code)
    })
  },
}

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: 'dist/index.js',
  platform: 'node',
  plugins: [Plugin],
  logLevel: 'debug',
  format: 'cjs',
})
