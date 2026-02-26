import express from "express";
import "dotenv/config";
import { connectDatabase } from "./config/connectdatabase.config.js";
import carRoutes from "./routes/car.routes.js";

const app = express();

connectDatabase(process.env.MONGO_URI);

app.use(express.json());

app.use("/api/car", carRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
