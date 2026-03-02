import { Router } from "express";
import { handleShortUrlRedirect, verifyPasswordAndRedirect } from "../controllers/redirectController.js";

const router = Router();

router.get("/:shortCode",handleShortUrlRedirect)
router.post("/:shortCode",verifyPasswordAndRedirect)

export default router;