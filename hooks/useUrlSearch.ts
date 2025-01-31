"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useUrlSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [pricing, setPricing] = useState<string>("");
  // Extract search parameters from the URL on initial render and whenever searchParams change

  useEffect(() => {
    const query = searchParams?.get("search") || "";
    setSearchQuery(query);

    const fav = searchParams?.get("isFav") === "true";
    setIsFavorite(fav);

    const pricingParam = searchParams?.get("pricing") || "";
    setPricing(pricingParam);
  }, [searchParams]);
  // Update URL search parameters based on changes in searchQuery, isFavorite, and pricing

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams?.toString());

    if (query) {
      newParams.set("search", query);
    } else {
      newParams.delete("search");
    }

    if (isFavorite) {
      newParams.set("isFav", "true");
    } else {
      newParams.delete("isFav");
    }

    if (pricing) {
      newParams.set("pricing", pricing);
    } else {
      newParams.delete("pricing");
    }

    router.push(`?${newParams.toString()}`);
  };

  return {
    searchQuery,
    isFavorite,
    pricing,
    updateSearchQuery,
  };
};
