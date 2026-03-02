import { Router } from "express";
import { createShortUrl, deleteShortUrlById, getAllShortUrls, getShortUrlById, updateShortUrlById } from "../controllers/shortUrlController.js";

const router = Router();

router.get("/", getAllShortUrls);

router.get("/:id",getShortUrlById)

router.post("/",createShortUrl);

router.put("/:id", updateShortUrlById);

router.delete("/:id", deleteShortUrlById);

export default router;
