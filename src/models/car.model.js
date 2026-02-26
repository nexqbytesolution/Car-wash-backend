import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    madeyear: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    carnumber: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const Car = mongoose.model("Car", carSchema);
export default Car;
