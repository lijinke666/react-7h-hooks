export const trim = (target: string, fullTrim: boolean = false) => {
  if (!fullTrim) {
    return target.trim()
  }
  return target.replace(/\s/gm, '')
}
