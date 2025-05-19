import express from "express";
import { transfering } from "../controllers/transferController.js";
import { userController } from "../controllers/userController.js";

const router = express.Router();

router.post("/api/transfer_money", transfering);
router.post("api/user", userController);

export default router;