"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const [error, setError] = useState<string>("");
  const [sucessMessage, setSucessMessage] = useState<string>("");

  const viewData = async () => {
    try {
      setSucessMessage("");
      setLoading(true);
      const response = await axios.get("/api/people");
      console.log("Response in the frontend: ", response);
      setPeople(response.data.data.data.people as Person[]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Error while fetching data");
    }
  };

  const addData = async () => {
    try {
      setSucessMessage("");
      setLoading(true);
      const response = await axios.get("/api/add_people");
      console.log("Response in the frontend: ", response);

      setSucessMessage("Data added successfully");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Error while adding data");
    }
  };

  const dropData = async () => {
    try {
      setSucessMessage("");
      setLoading(true);
      const response = await axios.get("/api/drop_people");
      console.log("Response in the frontend: ", response);
      setPeople([]);
      setSucessMessage("Data deleted successfully");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Error while deleting data");
    }
  };

  console.log("Data is", people);

  return (
    <main className="flex min-h-screen flex-col w-full justify-center items-center bg-gray-100 p-6">
      <section id="hello-banner" className="mb-6">
        <div className="flex flex-col w-full max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Testing the DB Connection
          </h1>
          <div className="flex flex-col lg:flex-row w-full gap-4 justify-center items-center">
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
          </div>
        </div>
      </section>
      {people && people.length > 0 && (
        <section
          id="data"
          className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-x-auto"
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
      {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
      {!loading && error && sucessMessage === "" && (
        <p className="text-center text-red-500 mt-4 font-bold text-2xl">
          {error}
        </p>
      )}
      {sucessMessage && (
        <p className="text-center text-green-500 mt-4 font-bold text-2xl">
          {sucessMessage}
        </p>
      )}

      <section id="back to home page">
        <div className="flex flex-col w-full max-w-4xl mx-auto text-center my-4">
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
