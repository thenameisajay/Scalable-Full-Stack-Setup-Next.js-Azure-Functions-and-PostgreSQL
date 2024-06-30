import { app } from "@azure/functions";
import { HttpExample } from "./functions/HttpExample";

app.setup({
  enableHttpStream: true,
});

app.http("HttpExample", {
  methods: ["GET", "POST"],
  authLevel: "anonymous", // This means no authentication is required
  handler: HttpExample,
});
