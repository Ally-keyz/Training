//auth.routes.js
import express from 'express';
import { registerController , loginController } from '../controllers/auth.controller.js';
const router = express.Router();

//register route
router.post('/register' , registerController);
//login route
router.post('/login' , loginController);

export default router;
