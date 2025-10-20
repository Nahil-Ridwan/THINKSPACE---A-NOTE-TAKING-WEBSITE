import { review } from '../controllers/reviewcontroller.js';
import { authenticateToken } from '../middleware/auth.js';
import express from "express";
    
const router = express.Router();

router.post("/",review); 

export default router;