import { NextResponse } from "next/server";
import { AxiosError } from "axios";
import { apiList } from "../../../API/ApiList";
import ApiService from "../../../API/ApiService";

export async function GET() {
  try {
    const response = await ApiService(apiList.GET_ALL_CATEGORY, "GET");

    if (response.ack) return NextResponse.json(response.categories);

    return NextResponse.json([]);
  } catch (error) {
    const err = error as AxiosError;

    console.error("Error fetching categories:", err.message);
    return NextResponse.json({
      ack: 0,
      status: err.response?.status || 500,
      error: "Failed to fetch categories",
      message: err.message,
    });
  }
}
