export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim())

  const targetCookie = cookies.find((cookie) => cookie.startsWith(`${encodeURIComponent(name)}=`))

  return targetCookie ? decodeURIComponent(targetCookie.split('=')[1]) : null
}
