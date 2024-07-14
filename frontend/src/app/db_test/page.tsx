'use client';

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Person {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  date_of_birth: string;
  country: string;
  sex: string;
  occupation: string;
  relationship_status: string;
  salary: string;
}

export default function Page() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [sucessMessage, setSucessMessage] = useState<string>('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const viewData = async () => {
    try {
      setSucessMessage('');
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/people`);
      console.log('Response in the frontend: ', response);
      setPeople(response.data.data.people as Person[]);
      if (response.data.status === 500) {
        setLoading(false);
        setSucessMessage('');
        console.log('Status is 500', response.data.error.message);
        setError(response.data.error.message as string);
        return;
      }
      setError('');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Error while fetching data');
    }
  };

  const addData = async () => {
    try {
      setSucessMessage('');
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/add_people`);
      console.log('Response in the frontend: ', response);
      if (response.data.status === 500) {
        setLoading(false);
        setSucessMessage('');
        console.log('Status is 500', response.data.error.message);
        setError(response.data.error.message as string);
        return;
      }

      setSucessMessage('Data added successfully');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Error while adding data');
    }
  };

  const dropData = async () => {
    try {
      setSucessMessage('');
      setLoading(true);
      const response = await axios.delete(`${API_URL}/api/drop_people`);
      console.log('Response in the drop func: ', response);
      // Weird bug over here
      if (response.status === 500) {
        setLoading(false);
        setSucessMessage('');
        console.log('Status is 500', response.data.error.message);
        setError(response.data.error.message as string);
        return;
      }
      console.log('Response in the frontend: ', response);
      setPeople([]);
      setSucessMessage('Data deleted successfully');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setPeople([]);
      setError('Data is empty');
    }
  };

  const addTestUser = async () => {
    try {
      setSucessMessage('');
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/add_test_user`);
      console.log('Response in the frontend: ', response);
      if (response.data.status === 500) {
        setLoading(false);
        setSucessMessage('');
        console.log('Status is 500', response.data.error.message);
        setError(response.data.error.message as string);
        return;
      }

      setSucessMessage('Data added successfully');
      setLoading(false);
    } catch (err) {
      setLoading(false);

      setError(err as string);
    }
  };

  console.log('Data is', people);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 p-6">
      <section id="hello-banner" className="mb-6">
        <div className="mx-auto flex w-full max-w-4xl flex-col text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">
            Testing the DB Connection
          </h1>
          <div className="flex w-full flex-col items-center justify-center gap-4 lg:flex-row">
            <Button
              type="button"
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={addData}
            >
              Populate Data
            </Button>
            <Button
              type="button"
              onClick={viewData}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              View Data
            </Button>
            <Button
              type="button"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={dropData}
            >
              Delete Data
            </Button>
            <Button
              type="button"
              className="bg-teal-500 text-white hover:bg-teal-600"
              onClick={addTestUser}
            >
              Add Test User
            </Button>
          </div>
        </div>
      </section>
      {people && people.length > 0 && (
        <section
          id="data"
          className="mx-auto w-full max-w-4xl overflow-x-auto rounded-lg bg-white shadow-md"
        >
          <Table>
            <TableCaption>
              A list of all the People in the Database.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="p-3 text-left">First Name</TableHead>
                <TableHead className="p-3 text-left">Last Name</TableHead>
                <TableHead className="p-3 text-center">Age</TableHead>
                <TableHead className="p-3 text-center">Date of Birth</TableHead>
                <TableHead className="p-3 text-center">Country</TableHead>
                <TableHead className="p-3 text-center">Sex</TableHead>
                <TableHead className="p-3 text-center">Occupation</TableHead>
                <TableHead className="p-3 text-center">
                  Relationship Status
                </TableHead>
                <TableHead className="p-3 text-center">Salary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {people.map((person) => (
                <TableRow key={person.id} className="hover:bg-gray-50">
                  <TableCell className="p-3">{person.first_name}</TableCell>
                  <TableCell className="p-3">{person.last_name}</TableCell>
                  <TableCell className="p-3 text-center">
                    {person.age}
                  </TableCell>
                  <TableCell className="p-3 text-center">
                    {person.date_of_birth}
                  </TableCell>
                  <TableCell className="p-3 text-center">
                    {person.country}
                  </TableCell>
                  <TableCell className="p-3 text-center">
                    {person.sex}
                  </TableCell>
                  <TableCell className="p-3 text-center">
                    {person.occupation}
                  </TableCell>
                  <TableCell className="p-3 text-center">
                    {person.relationship_status}
                  </TableCell>
                  <TableCell className="p-3 text-center">
                    {person.salary}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
      {loading && <p className="mt-4 text-center text-gray-500">Loading...</p>}
      {!loading && error !== '' && sucessMessage === '' && (
        <p className="mt-4 text-center text-2xl font-bold text-red-500">
          {error}
        </p>
      )}
      {sucessMessage && (
        <p className="mt-4 text-center text-2xl font-bold text-green-500">
          {sucessMessage}
        </p>
      )}

      <section id="back to home page">
        <div className="mx-auto my-4 flex w-full max-w-4xl flex-col text-center">
          <Link href="/">
            <Button type="button" variant="outline">
              Go Back
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
