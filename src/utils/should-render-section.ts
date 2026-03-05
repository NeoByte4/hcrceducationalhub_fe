export function shouldRenderSection<T>(data: T[] | undefined): boolean {
  return Array.isArray(data) && data.length > 0;
}
