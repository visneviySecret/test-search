import { DATASET } from "@/shared/dataset";

export async function getSearch(query: string, controller: AbortController) {
  // Try server API first
  try {
    return await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      method: "GET",
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
  } catch (e) {
    // Fallback for static hosting (no API routes): emulate response
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
