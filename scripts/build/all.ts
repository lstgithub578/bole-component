import { rollup } from 'rollup'
import { resolve } from 'path'
import { boleComponentRoot, buildOutput } from '../paths'

// 插件
import vuePlugin from '@vitejs/plugin-vue'
import esbuild, { minify } from 'rollup-plugin-esbuild'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import { formatBundleFilename, writeBundles } from './utils'

export async function buildAll() {
  const plugins = [
    vuePlugin({ isProduction: true }),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts']
    }),
    postcss({
      extract: true,
      plugins: [autoprefixer()]
    }),
    esbuild({
      sourceMap: false,
      target: 'es2018',
      loaders: {
        '.vue': 'ts'
      }
    })
    // minify({
    //   target: 'es2018',
    //   sourceMap: false
    // })
  ]

  const bundle = await rollup({
    input: resolve(boleComponentRoot, 'index.ts'),
    plugins,
    external: [
      'vue',
      'element-plus',
      '@element-plus/icons-vue',
      '@vue/shared',
      'lodash-es',
      'vue-router',
      'node_modules'
    ],
    treeshake: true,
    output: {
      sourcemap: false
    }
  })

  await writeBundles(bundle, [
    {
      format: 'umd',
      file: resolve(buildOutput, formatBundleFilename('index', 'js')),
      exports: 'named',
      name: 'boleComponent',
      globals: {
        vue: 'Vue',
        'element-plus': 'ElementPlus'
      },
      sourcemap: false
    },
    {
      format: 'cjs',
      file: resolve(buildOutput, formatBundleFilename('index', 'cjs')),
      sourcemap: false
    },
    {
      format: 'esm',
      file: resolve(buildOutput, formatBundleFilename('index', 'mjs')),
      sourcemap: false
    }
  ])
}
