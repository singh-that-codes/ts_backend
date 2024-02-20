import { Router } from "express";
import { createUserController, deleteteUserController, getUserController, updateUserController } from "../controllers/user.controller";

const userRouter = Router();

//Defining route paths

userRouter.get("/:userId", getUserController)
userRouter.post("/", createUserController)
userRouter.delete(":/userId", deleteteUserController)
userRouter.put("/", updateUserController)

export default userRouter
