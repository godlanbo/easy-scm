/**
 * 返回格式为 Year-month-day 的时间格式
 * @param rawDate 原始时间戳
 * @returns year-month-day
 */
export function dateTransformer(rawDate: string | number) {
  const date = new Date(+rawDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}-${month}-${day}`
}
