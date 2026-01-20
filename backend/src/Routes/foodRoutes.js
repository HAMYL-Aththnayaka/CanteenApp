//admin food backend eka
import express from 'express'
import {addFood, listFood, removeFood} from '../Controller/foodControler.js'
import multer from 'multer'

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
router.delete('/remove',removeFood)

export default router;