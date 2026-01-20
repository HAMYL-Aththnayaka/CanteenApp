//helping hand backend eka

import express from 'express'
import {addFood, listFood, removeFood,listFoodFrontEnd} from '../Controller/helpingHandFoodController.js'
import multer from 'multer'
import authMiddleware from '../Middleware/auth.js';
const router = express.Router();

//image storager
 const storage =multer.diskStorage({
    destination:'src/uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()} - ${file.originalname}`)
    }
 })
const upload = multer({storage:storage})
router.post('/add',upload.single('image'),addFood)
router.get('/list',listFood);
router.get('/listfront',authMiddleware,listFoodFrontEnd);
router.delete('/remove',removeFood)

export default router;