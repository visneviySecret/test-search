"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import * as Styled from "@/app/_styles/home.styles";
import useDebounce from "@/shared/lib/debounce";
import { useSearchParams } from "next/navigation";
import useSearchQuery from "@/features/search/useSearchQuery";
import { getSearch } from "@/shared/api/search";
import { SearchItem } from "../features/search/types";

function Home() {
  const searchParams = useSearchParams();
  const initialQuery = (searchParams?.get("q") || "").toString();

  const [query, setQuery] = useState<string>(initialQuery);
  const [results, setResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, 250);

  useSearchQuery(setQuery);

  const abortRef = useRef<AbortController | null>(null);
  const requestIdRef = useRef<number>(0);

  useEffect(() => {
    const currentQuery = debouncedQuery.trim();
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;
    const myRequestId = ++requestIdRef.current;
    setIsLoading(true);
    setError(null);

    getSearch(currentQuery, controller)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = (await r.json()) as {
          query: string;
          results: SearchItem[];
        };
        if (myRequestId === requestIdRef.current) {
          setResults(data.results);
        }
      })
      .catch((e) => {
        if (e.name === "AbortError") return;
        if (myRequestId === requestIdRef.current) {
          setError("Ошибка загрузки результатов");
          setResults([]);
        }
      })
      .finally(() => {
        if (myRequestId === requestIdRef.current) {
          setIsLoading(false);
        }
      });
    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <Styled.Main>
      <Styled.Container>
        <Styled.Label htmlFor="search">Поиск</Styled.Label>
        <Styled.InputWrap>
          <Styled.Input
            id="search"
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            placeholder="Введите запрос..."
          />
          {query ? (
            <Styled.ClearButton
              onClick={() => setQuery("")}
              aria-label="Очистить"
            >
              Очистить
            </Styled.ClearButton>
          ) : null}
        </Styled.InputWrap>
      </Styled.Container>

      <Styled.Container>
        {isLoading && <Styled.Muted>Загрузка…</Styled.Muted>}
        {error && <Styled.ErrorText>{error}</Styled.ErrorText>}

        {!isLoading && !error && results.length === 0 && debouncedQuery && (
          <Styled.Muted>Ничего не найдено</Styled.Muted>
        )}
        {!isLoading && results.length !== 0 && (
          <Styled.List>
            {results.map((item) => (
              <Styled.ListItem key={item.id}>
                <Styled.ItemTitle>{item.title}</Styled.ItemTitle>
                <Styled.ItemDesc>{item.description}</Styled.ItemDesc>
              </Styled.ListItem>
            ))}
          </Styled.List>
        )}
      </Styled.Container>
    </Styled.Main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Home />
    </Suspense>
  );
}
