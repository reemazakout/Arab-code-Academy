import React, { Suspense } from "react";
import AiToolsList from "../../sections/AiTools/AiToolsList";
import { AiToolsCardProps } from "../../sections/AiTools/types";
import { LoadingMessage } from "../../sections/AiTools/LoadingMessage";

export const dynamic = "force-dynamic";

async function fetchInitialAiTools(): Promise<AiToolsCardProps[]> {
  try {
    const res = await fetch(
      "https://sitev2.arabcodeacademy.com/wp-json/aca/v1/aitools?page=1",
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch AI tools");
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Error fetching AI tools:", error);
    return [];
  }
}

export default async function AiToolPage() {
  const initialAiTools = await fetchInitialAiTools();
  return (
    <Suspense fallback={<LoadingMessage />}>
      <AiToolsList initialAiTools={initialAiTools} />
    </Suspense>
  );
}
