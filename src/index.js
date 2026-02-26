import express from "express";
import "dotenv/config";
import { connectDatabase } from "./config/connectdatabase.config.js";

const app = express();

connectDatabase(process.env.MONGO_URI);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
