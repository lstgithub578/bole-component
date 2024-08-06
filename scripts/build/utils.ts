import { RollupBuild, OutputOptions } from 'rollup'

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export function formatBundleFilename(name: string, ext?: string) {
  return `${name}.${ext}`
}

export async function writeBundlesFunction(
  getBundle: (option: OutputOptions) => Promise<RollupBuild>,
  options: OutputOptions[]
) {
  const task = []
  for (let index = 0; index < options.length; index++) {
    const option = options[index]
    const bundle = await getBundle(option)
    task.push(bundle.write(option))
  }
  return task
}
