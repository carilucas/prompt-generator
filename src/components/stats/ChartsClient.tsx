"use client";

import dynamic from "next/dynamic";

export const Charts = dynamic(() => import("@/components/stats/Charts"), {
  ssr: false,
});
