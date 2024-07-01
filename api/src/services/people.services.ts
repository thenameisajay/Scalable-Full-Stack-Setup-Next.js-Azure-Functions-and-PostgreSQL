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

export async function addPeople() {
  const client = await createClient(); // Connect to the database

  // Define the people to be added
  const peopleToAdd = [
    {
      first_name: "John",
      last_name: "Doe",
      age: 28,
      date_of_birth: "1996-05-14",
      country: "USA",
      sex: "M",
      occupation: "Software Engineer",
      relationship_status: "Single",
      salary: 85000.0,
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      age: 34,
      date_of_birth: "1989-08-22",
      country: "Canada",
      sex: "F",
      occupation: "Data Analyst",
      relationship_status: "Married",
      salary: 92000.0,
    },
    {
      first_name: "Alice",
      last_name: "Johnson",
      age: 41,
      date_of_birth: "1982-02-17",
      country: "UK",
      sex: "F",
      occupation: "Project Manager",
      relationship_status: "Divorced",
      salary: 105000.0,
    },
    {
      first_name: "Bob",
      last_name: "Brown",
      age: 25,
      date_of_birth: "1999-11-05",
      country: "Australia",
      sex: "M",
      occupation: "Graphic Designer",
      relationship_status: "Single",
      salary: 62000.0,
    },
    {
      first_name: "Emily",
      last_name: "Davis",
      age: 30,
      date_of_birth: "1993-03-28",
      country: "New Zealand",
      sex: "F",
      occupation: "HR Specialist",
      relationship_status: "Married",
      salary: 74000.0,
    },
  ];

  try {
    await client.query("BEGIN"); // Start a transaction

    // Check if the table exists and create it if it does not
    const tableExistsQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'people'
      );
    `;
    const tableExistsResult = await client.query(tableExistsQuery);
    const tableExists = tableExistsResult.rows[0].exists;

    if (!tableExists) {
      const createTableQuery = `
        CREATE TABLE people (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(50) NOT NULL,
          last_name VARCHAR(50) NOT NULL,
          age INT,
          date_of_birth DATE,
          country VARCHAR(50),
          sex CHAR(1),
          occupation VARCHAR(100),
          relationship_status VARCHAR(50),
          salary NUMERIC
        );
      `;
      await client.query(createTableQuery);
    }

    // Check for existing records and prepare insertion statements
    for (const person of peopleToAdd) {
      const checkQuery = `SELECT 1 FROM people WHERE first_name = $1 AND last_name = $2 AND date_of_birth = $3`;
      const checkResult = await client.query(checkQuery, [
        person.first_name,
        person.last_name,
        person.date_of_birth,
      ]);

      if (checkResult.rowCount === 0) {
        // No existing record found
        const insertQuery = `
          INSERT INTO people (first_name, last_name, age, date_of_birth, country, sex, occupation, relationship_status, salary)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;
        await client.query(insertQuery, [
          person.first_name,
          person.last_name,
          person.age,
          person.date_of_birth,
          person.country,
          person.sex,
          person.occupation,
          person.relationship_status,
          person.salary,
        ]);
      }
    }

    await client.query("COMMIT"); // Commit the transaction
    console.log("People added successfully");
  } catch (err) {
    await client.query("ROLLBACK"); // Rollback in case of error
    console.error(err);
    throw new Error("Failed to add people");
  } finally {
    await client.end(); // Close the database connection
  }
}

export async function deletePeople() {
  const client = await createClient(); // Connect to the database

  try {
    // Start a transaction
    await client.query("BEGIN");

    // Drop the table if it exists
    await client.query("DROP TABLE IF EXISTS people");

    // Commit the transaction
    await client.query("COMMIT");
    console.log("People table dropped successfully");
  } catch (err) {
    // Rollback the transaction in case of error
    await client.query("ROLLBACK");
    console.error(err);
    throw new Error("Failed to drop the people table");
  } finally {
    await client.end(); // Close the database connection
  }
}
