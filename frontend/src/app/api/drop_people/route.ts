"use server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_URL = process.env.AZURE_FUNCTIONS_API_URL;
    const res = await axios.get(`${API_URL}/drop_people`);
    console.log("Response from the function: ", res);

    return NextResponse.json({
      status: 200,
      data: res.data,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: error as unknown as string,
    });
  }
}
