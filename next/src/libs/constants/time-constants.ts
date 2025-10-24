/** Example: "01.01.2021 14:00" */
export const dateFormat = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Istanbul',
} as const;

/** Example: "14:00" */
export const shortTimeFormat = {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Istanbul',
} as const;

/** Example: "Pzt, 1 Oca 14:00" */
export const shortDateFormat = {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Istanbul',
} as const;

/**  Example: "Pazartesi, 1 Ocak" */
export const longDateFormat = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'Europe/Istanbul',
} as const;
