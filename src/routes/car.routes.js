import { Router } from "express";
import { addCar } from "../controller/car.controller.js";

const router = Router();

router.post("/add", addCar);

export default router;
