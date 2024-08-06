import path, { resolve } from 'path'
import { writeFile, access } from 'fs/promises'
import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import postcssNested from 'postcss-nested'
import { compile } from 'sass'
import cssnano from 'cssnano'
import glob from 'fast-glob'
// @ts-ignore
import { copy, mkdirs } from 'fs-extra'

import { buildOutput, themeRoot } from '../paths'

const distRoot = resolve(buildOutput, './theme')
const styleRoot = resolve(themeRoot, './src')

export const buildTheme = async () => {
  /**
   * 加载theme/src下所有scss文件
   */
  const files = await glob([`*.scss`], {
    cwd: styleRoot,
    absolute: true
  })

  try {
    await access(distRoot)
  } catch (error) {
    await mkdirs(distRoot)
  }

  for (const item of files) {
    const content = compile(item)
    const { name } = path.parse(item)
    const plugins = [postcssNested, autoprefixer, cssnano]

    const result = await postcss(plugins).process(content.css, { from: undefined })
    const filename = name === 'index' ? 'index.css' : `bo-${name}.css`
    await writeFile(resolve(distRoot, filename), result.css)
  }

  /**
   * 复制theme/src的文件到 ./dist/src
   */
  await copy(styleRoot, resolve(distRoot, 'src'))

  await copy(resolve(distRoot, 'index.css'), resolve(buildOutput, 'index.css'))
}
