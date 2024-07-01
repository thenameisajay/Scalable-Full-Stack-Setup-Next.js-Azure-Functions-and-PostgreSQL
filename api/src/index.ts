import { app } from "@azure/functions";
import { Hello } from "./functions/Hello";
import { GetPeople } from "./functions/GetPeople";
import { AddPeople } from "./functions/AddPeople";
import { DeletePeople } from "./functions/DeletePeople";
-app.setup({
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
  handler: GetPeople,
});

app.http("AddPeople", {
  methods: ["GET"], // Ideally POST method should be used here but these are just examples
  authLevel: "anonymous",
  route: "add_people",
  handler: AddPeople,
});

app.http("DeletePeople", {
  methods: ["GET"], // Ideally DELETE method should be used here  but these are just examples
  authLevel: "anonymous",
  route: "drop_people",
  handler: DeletePeople,
});
