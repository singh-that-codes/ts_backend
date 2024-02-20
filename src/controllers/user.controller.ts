import { Request, Response } from "express";
import { getUserRepo, createUserRepo, deleteUserRepo, udpateUserRepo } from "../repositories/user.repositories";
import { IUserInterface } from "../database/interfaces/user.interface";

export const getUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;

    try {
        const user = await getUserRepo(userId)
        if (user) {
            res.status(200).json({ data: user });
        }
        else {
            res.status(500).json({ error: "User not found" });
        }

    } catch (error){
        console.log(error);
        res.status(500).json({ error: error });
    }
    
}

export const createUserController = async (req: Request, res: Response) => {
    const user: IUserInterface = req.body;

    try {
        const success = await createUserRepo(user)
        if (success) {
            res.status(200).json({ data: user });
        }
        else {
            res.status(500).json({ error: "User not created" });
        }

    } catch (error){
        console.log(error);
        res.status(500).json({ "error": error });
    }
    
}

export const updateUserController = async (req: Request, res: Response) => {
    const updatedUser: IUserInterface = req.body;

    try {
        const success = await udpateUserRepo(updatedUser.uid, updatedUser);
        if (success) {
            res.status(200).json({ data: "User updated" });
        }
        else {
            res.status(500).json({ error: "User not updated" });
        }

    } catch (error){
        console.log(error);
        res.status(500).json({ "error": error });
    }
}

export const deleteteUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;

    try {
        const success = await deleteUserRepo(userId);
        if (success) {
            res.status(200).json({ data: "User deleted" });
        }
        else {
            res.status(500).json({ error: "User not deleted" });
        }
    } catch (error){
        console.log(error);
        res.status(500).json({ error: error });
    }
}