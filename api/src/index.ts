import { app } from "@azure/functions";
import { Hello } from "./functions/Hello";
import { GetPeople } from "./functions/GetPeople";

app.setup({
  enableHttpStream: true,
});

app.http("Hello", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  route: "hello",
  handler: Hello,
});

app.http("GetPeople", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "people",
  handler: GetPeople
});
