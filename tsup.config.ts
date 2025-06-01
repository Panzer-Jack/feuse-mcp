import { TsconfigPathsPlugin } from '@esbuild-plugins/tsconfig-paths'
import { defineConfig } from 'tsup'
import { readFileSync } from 'node:fs'
import pkg from './package.json'

const textFilePlugin = {
  name: 'text-file-loader',
  setup(build: any) {
    // 处理 XML 文件
    build.onLoad({ filter: /\.xml$/ }, async (args: any) => {
      const content = readFileSync(args.path, 'utf8')
      return {
        contents: `export default ${JSON.stringify(content)}`,
        loader: 'js',
      }
    })

    // 处理 MD 文件
    build.onLoad({ filter: /\.md$/ }, async (args: any) => {
      const content = readFileSync(args.path, 'utf8')
      return {
        contents: `export default ${JSON.stringify(content)}`,
        loader: 'js',
      }
    })
  },
}

export default defineConfig({
  entry: ['src/main.ts'],
  format: ['cjs'],
  outDir: 'dist',
  treeshake: true,
  clean: true,
  sourcemap: false,
  noExternal: [
    ...Object.keys(pkg.dependencies || {}),
  ],
  external: ['playwright', '@valibot/to-json-schema'],
  esbuildPlugins: [
    TsconfigPathsPlugin({ tsconfig: './tsconfig.json' }),
    textFilePlugin,
  ],
})
