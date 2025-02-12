export function phoneMask(tel: string) {
  return tel
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/^(\d{2})\s?(\d{5})(\d)/, '($1) $2-$3')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')
}
