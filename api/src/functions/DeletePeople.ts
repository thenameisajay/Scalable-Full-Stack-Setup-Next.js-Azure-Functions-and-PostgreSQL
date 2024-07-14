import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import { deletePeople } from "../services/people.services";

export async function DeletePeople(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const response = await deletePeople();

    context.log("Response in the function: ", response);
    if (response) {
      return {
        status: 200,
        jsonBody: {
          data: "Deleted Data Successfully",
        },
      };
    } else {
      return {
        status: 500,
        jsonBody: {
          error: "Failed to delete Data",
        },
      };
    }
  } catch (err) {
    return {
      status: 500,
      jsonBody: { error: "Failed to fetch data" },
    };
  }
}
