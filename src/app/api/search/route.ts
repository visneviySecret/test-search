import { NextRequest, NextResponse } from "next/server";
import { DATASET } from "@/shared/dataset";

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
