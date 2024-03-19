import { ObjectId } from "mongodb";
import { Router } from "express";
import { db } from "../utils/db.js";

const pizzaRouter = Router();

pizzaRouter.get("/", async (req, res) => {
  const size = req.query.size;
  const customerName = req.query.customerName;

  const query = {};
  if (size) {
    query.size = new RegExp(size, "i");
  }

  const collection = db.collection("pizzaOrders");

  const pizzas = await collection.find(query).limit(10).toArray();

  return res.json({
    data: pizzas,
  });
});

pizzaRouter.get("/:pizzaId", async (res, req) => {
  const collection = db.collection("pizzaOrder");
  const pizzaId = new Object(req.params.pizzaId);

  const pizzasById = await collection.findOne({
    _id: pizzaId,
  });

  return res.json({
    data: pizzasById,
  });
});

pizzaRouter.post("/", async (req, res) => {
  const collection = db.collection("pizzaOrders");

  const pizzData = { ...req.body, created_at: new Date() };
  const pizzas = await collection.insertOne(pizzData);

  return res.json({
    message: "Pizza record has been update",
  });
});

pizzaRouter.put("/:pizzaId", async (req, res) => {
  const collection = db.collection("pizzaOrder");
  const newPizzaData = { ...req.body, created_at: new Date() };
  const pizzaId = new ObjectId(req.params.pizzaId);
  await collection.updateOne({ _id: pizzaId }, { set: newPizzaData });

  return res.json({
    message: `Pizza record (${pizzaId}) has been updated successfully`,
  });
});

pizzaRouter.delete("/:pizzaId", async (req, res) => {
  const collection = db.collection("pizzaOrder");

  const pizzaId = new ObjectId(req.params.pizzaId);

  await collection.deleteOne({
    _id: pizzaId,
  });
  return res.json({
    message: `Pizzza record (${pizzaId}) has been deleted successfully`,
  });
});

export default pizzaRouter;
