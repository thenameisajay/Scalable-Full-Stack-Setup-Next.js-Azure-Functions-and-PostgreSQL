import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import { getPeople } from "../services/people.services";

export async function GetPeople(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  try {
    const people = await getPeople();
    return {
      status: 200,
      jsonBody: { data: { people } },
    };
  } catch (err) {
    return {
      status: 500,
      jsonBody: { error: "Failed to fetch data" },
    };
  }
}
