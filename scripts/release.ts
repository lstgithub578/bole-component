import enquirer from 'enquirer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
// @ts-ignore
import semver from 'semver'
import { execSync } from 'node:child_process'
import chalk from 'chalk'
import { exit } from 'node:process'

const __fileurl = fileURLToPath(import.meta.url)
// 根目录
const rootDir = path.resolve(__fileurl, '../../')
const projectRoot = path.resolve(rootDir, './packages/boleComponent')
const packageJsonPath = path.resolve(projectRoot, './package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
const currentVersion = packageJson.version
const versionsTypes = ['patch', 'minor', 'major']

async function main() {
  let { version } = await enquirer.prompt<{ version: string }>({
    type: 'select',
    name: 'version',
    message: 'Select release type',
    choices: [
      ...versionsTypes.map((val) => `${val} (${semver.inc(currentVersion, val)})`),
      'custom'
    ]
  })

  if (version === 'custom') {
    version = (
      await enquirer.prompt<{ version: string }>({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion
      })
    ).version
  } else {
    const m = version.match(/\((.*)\)/)
    version = m ? m[1] : ''
  }

  // 验证版本号
  if (!semver.valid(version)) {
    console.log(chalk.red(`error: invalid target version: ${version}`))
    exit()
  }

  const { confirm } = await enquirer.prompt<{ confirm: string }>({
    type: 'confirm',
    name: 'confirm',
    message: `Releasing v${version}. Confirm?`
  })

  if (!confirm) {
    console.log(chalk.yellow(`cancel release`))
    exit()
  }

  packageJson.version = version
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')

  execSync('git add -A', { stdio: 'inherit' })

  execSync(`git commit -m "release v${version}"`, { stdio: 'inherit' })
  execSync(`git tag -a v${version} -m "v${version}"`, { stdio: 'inherit' })
  execSync('npm publish --registry=http://localhost:4873/', { cwd: projectRoot, stdio: 'inherit' })

  console.log(chalk.green(`Successfully published v${version}`))
}

main()
