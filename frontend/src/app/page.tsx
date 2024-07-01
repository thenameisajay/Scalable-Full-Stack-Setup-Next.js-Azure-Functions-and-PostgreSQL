"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const retriveData = async () => {
      try {
        setLoading(true);
        const API_URL = "http://localhost:3000/api/hello";
        const data = await axios.get(API_URL);
        console.log("Response in the frontend: ", data);

        setWelcomeMessage(data.data.data.message);
        setLoading(false);
      } catch (err) {
        setError("Error while fetching data");
      }
    };
    retriveData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center  w-full justify-center ">
      <section id="hello-banner">
        <div className="">
          <h1 className="text-8xl font-bold text-center text-gray-900">
            {loading ? "Loading..." : welcomeMessage}
            {error !== "" && <p className="text-red-500 text-sm">{error}</p>}
          </h1>
        </div>
      </section>
    </main>
  );
}
