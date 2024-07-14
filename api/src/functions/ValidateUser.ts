import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import { validateUser } from "../services/people.services";

interface User {
  email: string;
  password: string;
}

export async function ValidateUser(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  let email: string | null = null;
  let password: string | null = null;

  if (request.method === "POST") {
    try {
      const body: User = (await request.json()) as User;
      email = body.email;
      password = body.password;
    } catch (err) {
      context.log("Error parsing request body", err);
      return {
        status: 400,
        jsonBody: { message: "Invalid request body format" },
      };
    }
  } else {
    email = request.query.get("email");
    password = request.query.get("password");
  }

  if (!email || !password) {
    context.log("Missing email or password");
    return {
      status: 400,
      jsonBody: {
        message: "Missing email or password",
      },
    };
  }

  try {
    context.log(`Validating user with email: ${email}`);
    const response = await validateUser(email, password);
    if (!response) {
      return {
        status: 401,
        jsonBody: {
          message: "Invalid email or password",
        },
      };
    } else {
      return {
        status: 200,
        jsonBody: {
          message: `Successfully logged in!`,
        },
      };
    }
  } catch (err) {
    context.log("Error validating user", err);
    return {
      status: 500,
      jsonBody: { error: (err as Error).message },
    };
  }
}
