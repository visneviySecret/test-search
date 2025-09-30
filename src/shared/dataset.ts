export type SearchItem = { id: number; title: string; description: string };

export const DATASET: Array<SearchItem> = [
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
