export const isArray = Array.isArray

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isFunction = (val: unknown): val is Function => typeof val === 'function'

export function mergeObj(obj: Record<string, any>, originObj: Record<string, any>) {
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      if (isObject(originObj[key]) && !isArray(originObj[key])) {
        mergeObj(obj[key], originObj[key])
      } else {
        originObj[key] = obj[key]
      }
    }
  }
}
