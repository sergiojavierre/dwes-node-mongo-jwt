import express, { Router, Request, Response } from "express";
import UserRepositoryMongoDB from "../db/user.mongo";
import { UserUseCases } from "../../application/user.usecases";
import Message from "../../../context/responses/Message";
import User from "../../domain/User";
import { createToken } from "../jwt/auth";

const router: Router = express.Router();
const userUseCases = new UserUseCases(new UserRepositoryMongoDB());

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const response = await userUseCases.register(newUser);
    return res.status(201).json(response);
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    return res.status(500).json(message);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: User = {
      email,
      password,
    };
    const response = await userUseCases.login(user);
    const token = createToken(response as User);
    return res.status(201).json({
      user: {
        id: response.id,
        name: response.name,
        email: response.email,
      },
      token,
    });
  } catch (error) {
    const message: Message = {
      text: String(error),
    };
    return res.status(404).json(message);
  }
});

export default router;
