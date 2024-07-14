import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import { addTestUser } from "../services/people.services";

export async function AddTestUser(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const response = await addTestUser();

    if (response) {
      return {
        status: 200,
        jsonBody: {
          data: "Added Test User Successfully",
        },
      };
    } else {
      return {
        status: 500,
        jsonBody: {
          error: "Failed to add Test User",
        },
      };
    }
  } catch (err) {
    return {
      status: 500,
      jsonBody: { error: "Failed to add Test User" },
    };
  }
}
