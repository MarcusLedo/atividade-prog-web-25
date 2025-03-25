import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { addData, getData } from "./DB/firebase.js";

const app = express();
const __file = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__file);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/show", async (req, res) => {
  const travels = await getData();

  res.render("show", { travels });
});

app.post("/add", async (req, res) => {
  await addData(req.body);
  const { distance, fConsumption, price } = { ...req.body };
  const cost = fuelExpenseCalculator(distance, fConsumption, price);

  res.redirect("show");
});

app.listen(3000, () => {
  console.log("Listening on port 3000.");
});

function fuelExpenseCalculator(distance, consumption, price) {
  let cost;

  cost = (distance / consumption) * price;

  cost = cost.toFixed(2);

  return cost;
}
