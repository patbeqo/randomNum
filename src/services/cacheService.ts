export function getCache(): number[] | undefined {
  const data = localStorage.getItem("numbers");
  if (data) {
    Object.values(JSON.parse(data));
  }

  return undefined;
}

export function clearCache(): void {
  localStorage.removeItem("numbers");
}

export function setCache(numbers: number[]): void {
  localStorage.setItem("numbers", JSON.stringify(numbers));
}
