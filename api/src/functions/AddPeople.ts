import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import { addPeople } from "../services/people.services";

export async function AddPeople(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const response = await addPeople();
    if (!response) {
      return {
        status: 404,
        jsonBody: { error: "No data found" },
      };
    }
    return {
      status: 200,
      jsonBody: {
        data: "Added Data Successfully",
      },
    };
  } catch (err) {
    return {
      status: 500,
      jsonBody: { error: "Failed to add data" },
    };
  }
}
