"use server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_URL = process.env.AZURE_FUNCTIONS_API_URL;
    const res = await axios.get(`${API_URL}/Hello`);
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

export async function POST(request: Request) {
  try {
    const API_URL = process.env.AZURE_FUNCTIONS_API_URL;
    const bodyText = await request.text();
    const body = JSON.parse(bodyText);
    const name = body.name;
    console.log("Name: ", name);

    const res = await axios.get(`${API_URL}/Hello?name=${name}`); // I want it to be get request rather than post beacuse the function returns text response which I would need to parse to get json , it is your choice to keep it as post or change it to get
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
