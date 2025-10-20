import { createpool, joinpool } from '../controllers/poolcontroller.js';
import { authenticateToken } from '../middleware/auth.js';
import express from "express";
    
const router = express.Router();

router.post("/",createpool); 
router.post("/joinpool",joinpool);

export default router;