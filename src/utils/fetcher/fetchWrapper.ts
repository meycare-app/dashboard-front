export async function fetchWrapper<T = unknown>(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
) {
  const data = await fetch(
    `https://sistema-de-pontos-back.onrender.com${input}`,
    init,
  )
  const result = await data.json()

  return result as T
}
