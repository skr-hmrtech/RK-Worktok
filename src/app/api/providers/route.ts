import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { apiList } from "../../../API/ApiList";
import ApiService from "../../../API/ApiService";
import { createUrl } from "@/lib/common";

export async function GET(request: NextRequest) {
  try {
    const query: Record<string, string> = Object.fromEntries(
      request.nextUrl.searchParams.entries()
    );

    const response = await ApiService(
      createUrl(apiList.GET_ALL_PROVIDERS, query),
      "GET"
    );

    if (response.ack) return NextResponse.json(response);

    return NextResponse.json([]);
  } catch (error) {
    const err = error as AxiosError;

    console.error("Error fetching providers:", err.message);
    return NextResponse.json({
      ack: 0,
      status: err.response?.status || 500,
      error: "Failed to fetch providers",
      message: err.message,
    });
  }
}
