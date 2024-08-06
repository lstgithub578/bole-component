import path from 'node:path'

const resolve = path.resolve

export const projRoot = resolve(__dirname, '../')

export const pkgRoot = resolve(projRoot, 'packages')

export const boleComponentRoot = resolve(pkgRoot, 'boleComponent')

export const buildOutput = resolve(boleComponentRoot, 'dist')

export const DTS_OUT_DIR = resolve(buildOutput, 'types')

export const compRoot = resolve(pkgRoot, 'components')

export const themeRoot = resolve(pkgRoot, 'theme')

export const PKG_PREFIX = '@bole-component'

export const PKG_NAME = 'bole-component'
