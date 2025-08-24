import { delnote, getnote, getonenote, postnote, putnote } from '../controllers/notecontroller.js';

import express from "express";
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();

router.get("/",authenticateToken,getnote);

router.get("/:id",getonenote);

router.post("/",authenticateToken,postnote);


router.put("/:id", authenticateToken, putnote);

router.delete("/:id", authenticateToken, delnote);

export default router;