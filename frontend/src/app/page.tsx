"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [inputName, setInputName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const retrieveData = async () => {
      try {
        setLoading(true);
        const API_URL = "/api/hello";
        const data = await axios.get(API_URL);
        console.log("Response in the frontend: ", data);

        setWelcomeMessage(data.data.data.message);
        setLoading(false);
      } catch (err) {
        setWelcomeMessage("");
        setError("Error while fetching data");
        setLoading(false);
      }
    };
    retrieveData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString();

    try {
      setLoading(true);
      const API_URL = "/api/hello";
      const data = await axios.post(API_URL, { name });
      console.log("Response in the frontend: ", data);
      setWelcomeMessage(data.data.data.message);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setInputName("");
      setWelcomeMessage("");
      setError("Error while submitting data");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center w-full justify-center">
      <section id="hello-banner">
        <div className="">
          <h1 className="xl:text-8xl text-4xl font-bold text-center text-gray-900">
            {loading ? "Loading..." : welcomeMessage}
            {error !== "" && <p className="text-red-500 text-sm">{error}</p>}
          </h1>
        </div>
      </section>
      <form onSubmit={handleSubmit} method="post">
        <section id="input-field">
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-x-4 my-3 lg:my-10 lg:w-96 w-full">
            <Input
              name="name"
              placeholder="Enter your name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              required
            />
            <Button type="submit">Submit</Button>
          </div>
        </section>
      </form>
    </main>
  );
}
