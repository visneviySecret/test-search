export async function getSearch(query: string, controller: AbortController) {
  return await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
    method: "GET",
    signal: controller.signal,
    headers: { Accept: "application/json" },
  });
}
