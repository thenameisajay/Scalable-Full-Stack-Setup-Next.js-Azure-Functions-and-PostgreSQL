
import { Client } from "pg";



const { DB_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

async function createClient() {
  const client = new Client({
    user: POSTGRES_USER,
    host: DB_HOST,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
    port: 5432, // Default PostgreSQL port
  });
  try {
    await client.connect();
    console.log("Connected to PostgreSQL");
    return client;
  } catch (err) {
    console.error("Error connecting to PostgreSQL:", err);
    throw err;
  }
}

export { createClient };
