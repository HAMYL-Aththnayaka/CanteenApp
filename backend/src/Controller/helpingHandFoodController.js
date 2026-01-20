import helpingHandModel from "../Models/helpingHandModel.js";
import helpuser from '../Models/helpingUsers.js'
import fs from 'fs'

//add
export const addFood = async (req, res) => {
    try {
        let image_filename = req.file ? req.file.filename : req.body.image;
        console.log("Adding HH Food. Body:", req.body);
        console.log("Resolved Image Filename:", image_filename);

        if (!image_filename) {
            return res.status(400).send({ 
                success: false, 
                message: "Validation Error: Image filename is required" 
            });
        }

        const food = new helpingHandModel({
            name: req.body.name,
            description: req.body.description || "No description provided",
            price: 0,
            catagory: req.body.catagory || "General",
            canteen: req.body.canteen || "Main Canteen",
            image: image_filename
        });

        await food.save();
        res.status(200).send({ success: true, alert: "Food Added to Helping Hand" });
    } catch (err) {
        console.error("Backend addFood Error:", err);
        res.status(500).send({ success: false, Alert: err.toString() });
    }
}
//list foods
export const listFood = async (req, res) => {
    try { 
        const result = await helpingHandModel.find({});

        if (result) {
            res.status(200).send({
                success: true,
                Data: result,
            });
        } else {
            res.status(404).send({
                success: false,
                Data: result,
            });
        }

    } catch (err) {
        res.status(500).send({
            success: false,
            Alert: err.toString()
        });
    }
}


export const listFoodFrontEnd = async (req, res) => {
  try {
    const result = await helpingHandModel.find({});

    if (result) {
      return res.status(200).send({
        success: true,
        Data: result,
        User: true 
      });
    } else {
      return res.status(200).send({
        success: true,
        Data: [],
        User: true
      });
    }
  } catch (err) {
    console.error("Error in listFoodFrontEnd:", err);
    res.status(500).send({
      success: false,
      Alert: err.toString(),
    });
  }
};

export const removeFood = async (req, res) => {
    try {
        const id = req.body.id;

        if (!id) {
            return res.status(403).send({
                success: false,
                alert: "Please send the Id to delete"
            });
        }

        const food = await helpingHandModel.findById(id);

        if (!food) {
            return res.status(404).send({
                success: false,
                alert: "Id not valid"
            });
        }
        fs.unlink(`src/uploads/${food.image}`, () => { })

        const deletedResult = await helpingHandModel.findByIdAndDelete(id);
        if (!deletedResult) {
            return res.status(405).send({
                success: false,
                alert: "Something went wrong. Could not delete."
            });
        }

        res.status(200).send({
            success: true,
            alert: "Item removed successfully"
        });

    } catch (err) {
        console.log(err.toString());
        res.status(500).send({
            success: false,
            alert: err.toString()
        });
    }
};

