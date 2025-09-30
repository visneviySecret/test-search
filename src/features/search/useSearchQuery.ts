import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function useSearchQuery(
  debauncedQuery: string,
  setQuery: (value: string) => void
) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(
      Array.from(searchParams ? searchParams.entries() : [])
    );
    if (debauncedQuery) {
      params.set("q", debauncedQuery);
    } else {
      params.delete("q");
    }
    router.replace(`?${params.toString()}`);
  }, [debauncedQuery, router, searchParams, setQuery]);

  useEffect(() => {
    const urlQ = (searchParams?.get("q") || "").toString();
    setQuery(urlQ);
  }, [searchParams, setQuery]);
}
