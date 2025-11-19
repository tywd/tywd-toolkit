/**
 * 日期工具函数
 */

/**
 * 获取当前日期字符串 (YYYY-MM-DD)
 * @returns 当前日期字符串
 */
export function getCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 格式化日期
 * @param date 日期对象
 * @param format 格式字符串，支持 YYYY, MM, DD, HH, mm, ss
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

/**
 * 获取指定天数后的日期
 * @param days 天数
 * @returns 日期字符串
 */
export function getDateAfterDays(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date, 'YYYY-MM-DD');
}