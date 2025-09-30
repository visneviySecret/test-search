import { NextResponse } from "next/server";
export const dynamic = "error";
import { DATASET } from "@/shared/dataset";

export async function GET() {
  // Static export-compatible API: does not rely on request.url
  // Use query filtering only on client fallback; here return full dataset
  const q = "";

  if (!q) {
    return NextResponse.json({ query: q, results: DATASET });
  }

  const results = DATASET;

  return NextResponse.json({ query: q, results });
}
