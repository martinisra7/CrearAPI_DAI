import 'dotenv/config'
import express from "express";
import cors from "cors";
import PizzaRouter from "./src/controllers/pizzaController.js";

const app  = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/front', express.static('public'));


app.use("/api/pizzas", PizzaRouter);

app.listen(port, () => {
  console.log(`"server" escuchando el en el puerto ${port} (http://localhost:${port}/)`);
});