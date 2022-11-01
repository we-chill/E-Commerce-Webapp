type SaveCookieOverload = {
  (cookie: string, value: string, expires?: string): void;
};
export const saveCookie: SaveCookieOverload = (cookie, value, expires) => {
  const cookieName = cookie;
  const domain = window.location.hostname;
  document.cookie = `${cookieName}=${value}; Domain=${domain}; Path=/; SameSite=strict; ${expires}`;
};

type ClearCookieOverload = {
  (cookie: string): void;
};
const clearCookie: ClearCookieOverload = (cookie) => {
  const expires = 'expires=Thu, 01 Jan 1970 00:00:01 GMT';
  saveCookie(cookie, '', expires);
};

export const getAllCookieKeys = (): string[] => {
  const pairs = document.cookie.split(';');
  const cookies: string[] = [];
  for (let i = 0; i < pairs.length; i += 1) {
    cookies.push(pairs[i].split('=')[0]);
  }
  return cookies;
};

export const clearOldAuthCookies = () => {
  const keys = getAllCookieKeys();
  keys.forEach((key) => clearCookie(key));
};

export const getCookie = (cookieName: string) => {
  if (!document || !document.cookie) return undefined;

  const cookies = document.cookie.split(';');

  return cookies
    .find((row) => row.trim().startsWith(cookieName))
    ?.split('=')
    ?.pop();
};
