import express from "express";
import { isAuth } from "../../../users/infrastructure/jwt/auth";

const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  try {
    return res.status(201).json({
      message: "Hello world",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;
