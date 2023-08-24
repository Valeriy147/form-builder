export function deepClone(str: string | null): string {
  return JSON.parse(JSON.stringify(str))
}

export function viewLabelName(elem: string) {
  return (elem)[0].toUpperCase() + (elem).slice(1) + ' label'
}


