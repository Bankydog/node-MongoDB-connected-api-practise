import { client } from "./utils/db.js";
import express from "express";
import pizzaRouter from "./apps/pizzas.js";

async function init() {
  const app = express();
  const PORT = 4000;

  await client.connect();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/pizzas", pizzaRouter);

  app.get("/", (req, res) => {
    res.send("Hiiiiiii");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found");
  });

  app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
  });
}

init();
