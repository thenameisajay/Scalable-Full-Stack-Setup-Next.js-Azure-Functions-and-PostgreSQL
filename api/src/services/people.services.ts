import { createClient } from "./db";

export async function getPeople() {
  const client = await createClient(); // Connect to the database

  try {
    const result = await client.query("SELECT * FROM people");
    return result.rows; // Return the fetched data
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch data"); // Throw an error instead of sending a response
  } finally {
    await client.end();
  }
}
