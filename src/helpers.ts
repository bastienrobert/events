/**
 * fast filter function
 * @param arr - The array (or array-like) to filter
 * @param fn - The filter function
 * @returns filtered array
 */
export function filter(
  arr: any[],
  fn: (current?: any, i?: number) => boolean
): any[] {
  const length = arr.length
  let result = []
  for (let i = 0; i < length; i++) {
    const current = arr[i]
    if (fn(current, i)) {
      result.push(current)
    }
  }
  return result
}
