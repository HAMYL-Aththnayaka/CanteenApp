import {ViewHelp,deleteHelp} from '../Controller/helpUsersController.js'
import express from 'express'
const router = express.Router();

router.get('/view',ViewHelp);
router.post('/removehelp/:id',deleteHelp);

export default router;