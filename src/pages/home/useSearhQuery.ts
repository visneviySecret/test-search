import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function useSearhQuery(
  debouncedQuery: string,
  setQuery: (value: string) => void
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (debouncedQuery) {
      params.set("q", debouncedQuery);
    } else {
      params.delete("q");
    }
    router.push(`?${params.toString()}`);
  }, [debouncedQuery]);

  useEffect(() => {
    const urlQ = (searchParams.get("q") || "").toString();
    setQuery(urlQ);
  }, [searchParams]);
}
