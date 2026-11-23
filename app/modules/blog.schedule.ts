const DAY_ONLY = /^\d{4}-\d{2}-\d{2}$/;

export const publishedAt = (date: string) =>
  Date.parse(DAY_ONLY.test(date) ? `${date}T00:00:00-03:00` : date);

export const isLive = (date: string, now = Date.now()) => publishedAt(date) <= now;
