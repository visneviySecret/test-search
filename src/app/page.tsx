import React, { Suspense } from "react";
import Home from "@/pages/home/page";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Home />
    </Suspense>
  );
}
