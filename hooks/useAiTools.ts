import useSWRInfinite from "swr/infinite";
import { AiToolsCardProps } from "../sections/AiTools/types";
import { useUrlSearch } from "./useUrlSearch";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("فشل في جلب البيانات");
  }
  const data = await res.json();
  return data?.data || [];
};

export const useAiTools = (initialAiTools: AiToolsCardProps[]) => {
  const { searchQuery, isFavorite, pricing } = useUrlSearch();
  const PAGE_SIZE = 12;

  //Function to construct API request URL with filters

  const getKey = (pageIndex: number, previousPageData: unknown[]) => {
    // If we've reached the end of the data, stop requesting
    if (previousPageData && previousPageData.length === 0) return null;

    const baseUrl = new URL(
      "https://sitev2.arabcodeacademy.com/wp-json/aca/v1/aitools"
    );

    baseUrl.searchParams.set("page", (pageIndex + 1).toString());
    baseUrl.searchParams.set("page_size", PAGE_SIZE.toString());
    // Add filters from URL search params
    if (searchQuery) baseUrl.searchParams.set("search", searchQuery);
    if (isFavorite) baseUrl.searchParams.set("isFav", "true");
    if (pricing) baseUrl.searchParams.set("pricing", pricing);

    return baseUrl.toString();
  };

  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      fallbackData: [initialAiTools],
    }
  );
  // Aggregating data from all pages

  const aiTools = data ? [].concat(...data) : [];

  const hasMore = data ? data[data.length - 1]?.length === PAGE_SIZE : false;

  return {
    aiTools,
    error,
    isLoading: !error && !data,
    loadMore: () => setSize(size + 1),
    hasMore,
    isValidating,
    currentPage: size,
    pageSize: PAGE_SIZE,
  };
};
