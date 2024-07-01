# Scalable Full-Stack Setup: Next.js, Azure Functions, and PostgreSQL

This example demonstrates deploying a Next.js app to Azure Functions. The architecture consists of a front-end, Azure Functions as middleware, and a PostgreSQL database (using Docker), forming the back-end. The front-end communicates with the back-end through the middleware, ensuring a detachable front-end.

## Prerequisites

- Familiarity with fundamental API concepts
- An Azure account with an active subscription
- Azure CLI version 2.4 or later
- Docker
- Node.js
- Azure Functions Core Tools
- Azure Functions extension for VS Code

## Azure Functions Documentation

- [Azure Local Development](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-typescript?source=recommendations&pivots=nodejs-model-v4)

## Environment Variables

Three configuration files are required:
- `.env` in the project root for Docker
- `.env` in the `frontend` folder
- `local.settings.json` in the `api` folder for Azure Functions

Examples of these files are provided in the repository.

## Steps to Run the Project

1. **Clone the repository:**
   
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. **Start the PostgreSQL database:**

   In the project root, run:

   ```bash
   docker-compose up
   ```

   Customize the database credentials in the `docker-compose.yml` file via `.env` or directly.

3. **Set up Azure Functions:**

   Navigate to the `api` folder and install dependencies:

   ```bash
   cd api
   npm install
   ```

   For the initial setup, deploy the functions to Azure by running:

   ```bash
   func start
   ```

   Follow the prompts to configure and debug the functions locally.

4. **Set up the front-end:**

   Navigate to the `frontend` folder and install dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the front-end:**

   ```bash
   npm run dev
   ```

6. **Access the application:**

   Open a browser and navigate to `http://localhost:3000`.

## Testing and Usage

- Navigate to `http://localhost:3000` to see the default "Hello World" message from the API.
- Enter your name to see it reflected, indicating the endpoint is working.
- Click the "Populate Data" button to insert sample data of 5 people into the database.
- Click the "Delete Data" button to remove the data.
- Click the "View Data" button to view the data.

## Conclusion

This example illustrates deploying a Next.js app with Azure Functions as middleware and a PostgreSQL database back-end. The front-end remains detachable, ensuring a flexible architecture.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.