import Car from "../models/car.model.js";

export const addCar = async (req, res) => {
  try {
    const { name, model, madeyear, color, price, carnumber } = req.body;
    if (!name || !model || !madeyear || !color || !price || !carnumber) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newCar = await Car.create({
      name,
      model,
      madeyear,
      color,
      price,
      carnumber,
    });
    console.log(new Date());
    res.status(201).json({
      message: "Car added successfully",
      status: "success",
      statusCode: 201,
      sucess: true,
      car: newCar,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
