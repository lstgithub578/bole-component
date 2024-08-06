import glob from 'fast-glob'
import {
  pkgRoot,
  buildOutput,
  DTS_OUT_DIR,
  PKG_PREFIX,
  PKG_NAME,
  projRoot,
  boleComponentRoot
} from '../paths'
import path, { resolve } from 'path'
import { ModuleFormat, OutputOptions, Plugin, rollup } from 'rollup'
import { writeBundlesFunction } from './utils'

// 插件
import nodeResolve from '@rollup/plugin-node-resolve'
import vuePlugin from '@vitejs/plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss'
import dts from 'vite-plugin-dts'
import commonjs from '@rollup/plugin-commonjs'

const excludes = [
  'node_modules',
  '__tests__',
  'dist',
  'packages/utils',
  'play',
  'packages/resolver'
]

export const excludeFiles = (files: string[]) => {
  return files.filter((path) => ![...excludes].some((exclude) => path.includes(exclude)))
}

const buildConfig = [
  {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: resolve(buildOutput, 'es')
    }
  },
  {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: resolve(buildOutput, 'lib')
    }
  }
]

export async function buildModules() {
  const input = excludeFiles(
    await glob(['**/*.{js,ts,vue}'], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  )

  const getBundle = async (options: OutputOptions) => {
    const sourceStyle = `@external`
    const module = options.format === 'esm' ? 'es' : 'lib'
    const bundleStyle = `element-plus/${module}/components`
    const ext = options.format === 'esm' ? '.mjs' : '.js'

    const sourceThemeChalk = `${PKG_PREFIX}/theme` as const
    const bundleThemeChalk = `${PKG_NAME}/dist/theme` as const
    const plugins = [
      {
        name: 'bole-components-alias-plugin',
        resolveId(id: string) {
          if (!id.startsWith(sourceThemeChalk)) return
          return {
            id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
            external: 'absolute'
          }
        }
      } as Plugin,
      {
        name: 'bole-component-external-plugin',
        resolveId(id: string) {
          if (!id.startsWith(sourceStyle)) return
          return {
            id: id.replaceAll(sourceStyle, bundleStyle) + ext,
            external: 'absolute'
          }
        }
      } as Plugin,
      vuePlugin({ isProduction: true }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
      }),
      commonjs(),
      esbuild({
        sourceMap: false,
        target: 'es2018',
        loaders: {
          '.vue': 'ts'
        }
      }),
      postcss({
        extract: true,
        plugins: [autoprefixer()]
      })
      // minify({
      //   target: 'es2018',
      //   sourceMap: false
      // })
    ]

    const config = {
      input,
      external: [
        'vue',
        'element-plus',
        '@element-plus/icons-vue',
        '@vue/shared',
        'lodash-es',
        'vue-router',
        'node_modules'
      ],
      treeshake: false,
      plugins:
        options.format === 'esm'
          ? [
              ...plugins,
              dts({
                root: projRoot,
                entryRoot: pkgRoot,
                outDir: DTS_OUT_DIR,
                staticImport: true,
                insertTypesEntry: false,
                cleanVueFileName: false,
                copyDtsFiles: false,
                strictOutput: true,
                include: ['packages'],
                exclude: ['**/dist/**', '**/__tests__/**/*', '**/*.md', 'play/**/*', 'docs/**/*'],
                resolvers: [
                  {
                    name: 'bole-component-css-resolver',
                    supports: (id: string) => id.includes('/style/css.ts'),
                    transform: ({ id, code }: { id: string; code: string }) => {
                      const tempPath = id.replaceAll('/', path.sep)
                      let content = code
                        .replaceAll(sourceStyle, 'element-plus/es/components')
                        .replaceAll('"use strict";', '')
                        .replaceAll(`${PKG_PREFIX}/theme`, `${PKG_NAME}/dist/theme`)
                      content = content.replaceAll(`packages/bole-component`, `bole-component`)
                      return [
                        {
                          path: tempPath.replace(pkgRoot, './types').replace('.ts', '.d.ts'),
                          content: JSON.stringify(content)
                        }
                      ]
                    }
                  }
                ],
                beforeWriteFile: (filePath: string, content: string) => {
                  content = content.replaceAll(`${PKG_PREFIX}/`, `${PKG_NAME}/es/`)

                  // 将boleComponent类型文件移到上个目录
                  if (filePath.includes('dist/types/boleComponent')) {
                    filePath = filePath.replace('dist/types/boleComponent', 'dist/types')
                    content = content.replaceAll('../', './')
                  }
                  if (filePath.includes('style/css')) {
                    content = JSON.parse(content.replace(sourceStyle, 'element-plus/es/components'))
                  }
                  return {
                    filePath,
                    content
                  }
                }
              })
            ]
          : plugins
    }

    return await rollup(config)
  }

  await writeBundlesFunction(
    getBundle,
    buildConfig.map((config): OutputOptions => {
      return {
        format: config.format as ModuleFormat,
        dir: config.output.path,
        exports: config.format === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: boleComponentRoot,
        sourcemap: false,
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name.includes('node_modules')) {
            return chunkInfo.name.replace('node_modules', 'external') + '.js'
          }

          return `[name].${config.ext}`
        }
      }
    })
  )
}
