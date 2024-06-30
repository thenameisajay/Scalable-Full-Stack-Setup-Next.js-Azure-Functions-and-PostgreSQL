import { app } from "@azure/functions";
import { Hello } from "./functions/Hello";

app.setup({
  enableHttpStream: true,
});

app.http("Hello", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: Hello,
});
