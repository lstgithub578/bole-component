import type { ComponentResolver, ComponentInfo } from 'unplugin-vue-components'

function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

export interface BoleComponentResolverOptions {
  ssr?: boolean
}

function resolveComponent(
  name: string,
  options: BoleComponentResolverOptions
): ComponentInfo | undefined {
  if (!name.match(/^Bo[A-Z]/)) return

  const filename = kebabCase(name)
  const module = options.ssr ? 'lib' : 'es'
  const componentStyle = `bole-component/dist/${module}/components/${filename.replace('bo-', '')}/style/css`

  return {
    name,
    from: 'bole-component',
    sideEffects: componentStyle
  }
}

export function BoleComponentResolver(
  options: BoleComponentResolverOptions = {}
): ComponentResolver {
  return (name: string) => {
    return resolveComponent(name, options)
  }
}
