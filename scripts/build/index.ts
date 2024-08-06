import { resolve } from 'path'
import { buildAll } from './all'
import { buildModules } from './modules'
import { buildTheme } from './theme'
// @ts-ignore
import { copy, remove } from 'fs-extra'
// @ts-ignore
import chalk from 'chalk'
import { buildOutput, projRoot, boleComponentRoot } from '../paths'

const copyFiles = () =>
  Promise.all([
    copy(resolve(projRoot, 'README.md'), resolve(boleComponentRoot, 'README.md')),
    copy(resolve(projRoot, 'global.d.ts'), resolve(boleComponentRoot, 'global.d.ts'))
  ])

const types = resolve(buildOutput, 'types')

const copyDts = async () => {
  /**
   * copy es dts
   */
  const targetES = resolve(buildOutput, 'es')
  await copy(types, targetES)

  /**
   * copy lib dts
   */
  const targetLib = resolve(buildOutput, 'lib')
  await copy(types, targetLib)
}

const removeDts = async () => {
  const types = resolve(buildOutput, 'types')
  await remove(types)
}

const task = [buildAll(), buildModules(), buildTheme()]

Promise.all(task)
  .then(async () => {
    console.log(chalk.green('Successfully built!'))
    await copyDts()
    console.log(chalk.green('Successfully copied definition file!'))
    await removeDts()
    await copyFiles()
    console.log(chalk.green('Successfully copied README.md and global.d.ts!'))
  })
  .catch((err) => {
    console.log(err)
  })
