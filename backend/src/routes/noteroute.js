import { delnote, getnote, getonenote, postnote, putnote } from '../controllers/notecontroller.js';

import express from "express";
const router = express.Router();

router.get("/",getnote);

router.get("/:id",getonenote);

router.post("/",postnote);

router.put("/:id",putnote);

router.delete("/:id",delnote);

export default router;