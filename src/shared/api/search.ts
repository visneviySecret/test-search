import { DATASET } from "@/shared/dataset";

export async function getSearch(query: string, controller: AbortController) {
  try {
    return await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      method: "GET",
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
  } catch {
    const q = (query || "").trim().toLowerCase();
    const results = q
      ? DATASET.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
        )
      : DATASET;
    return new Response(JSON.stringify({ query: q, results }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }
}
