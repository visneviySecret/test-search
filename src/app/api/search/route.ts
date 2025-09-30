import { NextRequest, NextResponse } from "next/server";

const DATASET: Array<{ id: number; title: string; description: string }> = [
  {
    id: 1,
    title: "Next.js руководство",
    description: "Основы Next.js и лучшие практики.",
  },
  {
    id: 2,
    title: "TypeScript советы",
    description: "Полезные советы по TS для React.",
  },
  {
    id: 3,
    title: "React оптимизация",
    description: "Мемоизация, Suspense и оптимизация рендеринга.",
  },
  {
    id: 4,
    title: "Алгоритмы поиска",
    description: "Линейный поиск, бинарный поиск, индексация.",
  },
  {
    id: 5,
    title: "Асинхронность в JS",
    description: "Промисы, async/await, AbortController.",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  if (!q) {
    return NextResponse.json({ query: q, results: DATASET });
  }

  const results = DATASET.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
  ).slice(0, 20);

  return NextResponse.json({ query: q, results });
}
