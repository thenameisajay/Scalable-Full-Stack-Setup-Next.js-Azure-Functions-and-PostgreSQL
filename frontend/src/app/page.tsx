'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [inputName, setInputName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [welcomeMessage, setWelcomeMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const retrieveData = async () => {
      try {
        setLoading(true);
        const API_URL = '/api/hello';
        const data = await axios.get(API_URL);
        console.log('Response in the frontend: ', data);

        setWelcomeMessage(data.data.data.message as string);
        setLoading(false);
      } catch (err) {
        setWelcomeMessage('');
        setError('Error while fetching data');
        setLoading(false);
      }
    };
    void retrieveData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name')?.toString();

    try {
      setLoading(true);
      const API_URL = '/api/hello';
      const data = await axios.post(API_URL, { name });
      console.log('Response in the frontend: ', data);
      setWelcomeMessage(data.data.data.message as string);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setInputName('');
      setWelcomeMessage('');
      setError('Error while submitting data');
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <section id="hello-banner">
        <div className="">
          <h1 className="text-center text-4xl font-bold text-gray-900 xl:text-8xl">
            {loading ? 'Loading...' : welcomeMessage.toUpperCase()}
            {error !== '' && (
              <h2 className="text-4xl text-red-500 lg:text-5xl">{error}</h2>
            )}
          </h1>
        </div>
      </section>
      <form onSubmit={handleSubmit} method="post">
        <section id="input-field">
          <div className="my-3 flex w-full flex-col items-center justify-center space-y-4 lg:my-10 lg:w-96 lg:flex-row lg:space-x-4 lg:space-y-0">
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
        <section id="database-testing">
          <div
            className="mt-5 flex w-full items-center justify-center"
            security="
          "
          >
            <Link href="/db_test">
              <Button
                type="button"
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                disabled={loading}
              >
                Test Database
              </Button>
            </Link>
          </div>
        </section>
      </form>
    </main>
  );
}
