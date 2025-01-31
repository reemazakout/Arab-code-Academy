import { NextResponse } from "next/server";

const BASE_URL = "https://sitev2.arabcodeacademy.com/wp-json/aca/v1/aitools";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("page_size") || "12";

    const apiUrl = new URL(BASE_URL);
    apiUrl.searchParams.set("page", page);
    apiUrl.searchParams.set("page_size", pageSize);

    const optionalParams = ["search", "pricing", "isFav"];
    optionalParams.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        apiUrl.searchParams.set(param, value);
      }
    });

    console.log("Fetching from:", apiUrl.toString());

    const response = await fetch(apiUrl.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Received API Data:", data);

    if (!data || !data?.data) {
      throw new Error("API data is empty or malformed");
    }

    const formattedResponse = {
      data: data?.data || [],
      total: data?.total || 0,
      current_page: parseInt(page),
      has_more: Boolean(
        data?.data?.length === parseInt(pageSize) && data?.data?.length > 0
      ),
      page_size: parseInt(pageSize),
    };

    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
