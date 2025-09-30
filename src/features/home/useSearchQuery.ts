import { useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function useSearchQuery(setQuery: (value: string) => void) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleQueryInput = useCallback(
    (nextValue: string) => {
      setQuery(nextValue);
      const params = new URLSearchParams(
        Array.from(searchParams ? searchParams.entries() : [])
      );
      if (nextValue) {
        params.set("q", nextValue);
      } else {
        params.delete("q");
      }
      router.replace(`?${params.toString()}`);
    },
    [router, searchParams, setQuery]
  );

  useEffect(() => {
    const urlQ = (searchParams?.get("q") || "").toString();
    setQuery(urlQ);
  }, [searchParams, setQuery]);

  return { handleQueryInput };
}
