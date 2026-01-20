import foodModel from "../Models/foodModel.js";
import fs from 'fs';

// ADD FOOD
export const addFood = async (req, res) => {
  try {
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      catagory: req.body.catagory, 
      canteen: req.body.canteen,
      image: req.file.filename,
    });

    await food.save();

    res.status(200).send({
      success: true,
      alert: "Food Added",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      alert: "Food Not Added",
    });
  }
};

// LIST FOOD 
export const listFood = async (req, res) => {
  try {
    const result = await foodModel.find({});

    res.status(200).send({
      success: true,
      Data: result,  
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      Data: [],
      alert: "Error fetching food",
    });
  }
};

// REMOVE FOOD
export const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).send({
        success: false,
        alert: "Please send the Id",
      });
    }

    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).send({
        success: false,
        alert: "Food not found",
      });
    }

    fs.unlink(`src/uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      alert: "Item removed successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      alert: "Delete failed",
    });
  }
};
