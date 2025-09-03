import { login, register } from '../controllers/usercontroller.js';
import { authenticateToken } from '../middleware/auth.js';
import express from "express";
    
const router = express.Router();

router.post("/",register); //REGISTER

router.post("/login",login); //LOGIN

export default router;