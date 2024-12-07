export async function fetchWrapper<T = unknown>(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
) {
  const data = await fetch(`http://3.225.87.60:3000${input}`, init)
  const result = await data.json()

  return result as T
}
