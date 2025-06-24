import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { apiList } from "../../../../API/ApiList";
import ApiService from "../../../../API/ApiService";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ providerId: string }> }
) {
  const { providerId } = await context.params;

  try {
    const response = await ApiService(
      `${apiList.GET_ALL_PROVIDERS}?providerId=${providerId}`,
      "GET"
    );

    if (response.ack && response.data?.length === 1) {
      return NextResponse.json(response.data[0]);
    }

    return NextResponse.json(null);
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
