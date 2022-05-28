function addZero(number: number) {
  return number < 10 ? `0${number}` : number
}
/**
 * 返回格式为 Year-month-day 的时间格式
 * @param rawDate 原始时间戳
 * @param isMinute 是否精确到分钟
 * @returns year-month-day
 */
export function dateTransformer(
  rawDate: string | number | undefined,
  isMinute = false,
) {
  if (!rawDate) return ''
  const date = new Date(+rawDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return isMinute
    ? `${year}-${addZero(month)}-${addZero(day)} ${addZero(hour)}:${addZero(
        minute,
      )}`
    : `${year}-${addZero(month)}-${addZero(day)}`
}
