import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const API_URL = `http://localhost:7071/api`; // Azure Function URL
  try {
    const res = axios.get(`${API_URL}/hello`);

    console.log("Response from the function: ", res);

    return NextResponse.json({
      status: 200,
      data: res,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: error as unknown as string,
    });
  }
}
