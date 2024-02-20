import { Request, Response } from "express";
import { createTweetRepo, deleteTweetRepo, getTweetRepo, udpateTweetRepo } from "../repositories/tweet.repositories";
import { ITweetInterface } from "../database/interfaces/tweet.interface";
import { updateUserWithTweetIdRepo } from "../repositories/user.repositories";


export const getTweetController = async (req: Request, res: Response) => {
    const TweetId = req.params.TweetId as string;

    try {
        const Tweet = await getTweetRepo(TweetId)
        if (Tweet) {
            res.status(200).json({ data: Tweet });
        }
        else {
            res.status(500).json({ error: "Tweet not found" });
        }

    } catch (error){
        console.log(error);
        res.status(500).json({ error: error });
    }
    
}

export const createTweetController = async (req: Request, res: Response) => {
    const Tweet: ITweetInterface = req.body;

    try {
        const success = await createTweetRepo(Tweet)
        if (success) {
            const userUpdateSuccess = await updateUserWithTweetIdRepo(Tweet.adminId, Tweet.tweetId);
            if (userUpdateSuccess) {
                res.status(200).json({ data: Tweet });
                res.status(200).json({ error: "Reflected tweet" });
            }
            else {
                res.status(500).json({ error: "User not updated" });
            }
        }
        else {
            res.status(500).json({ error: "Tweet not created" });
        }

    } catch (error){
        console.log(error);
        res.status(500).json({ "error": error });
    }
    
}

export const updateTweetController = async (req: Request, res: Response) => {
    const updatedTweet: ITweetInterface = req.body;

    try {
        const success = await udpateTweetRepo(updatedTweet.tweetId, updatedTweet);
        if (success) {
            res.status(200).json({ data: "Tweet updated" });
        }
        else {
            res.status(500).json({ error: "Tweet not updated" });
        }

    } catch (error){
        console.log(error);
        res.status(500).json({ "error": error });
    }
}

export const deleteTweetController = async (req: Request, res: Response) => {
    const TweetId = req.params.TweetId as string;

    try {
        const success = await deleteTweetRepo(TweetId);
        if (success) {
            res.status(200).json({ data: "Tweet deleted" });
        }
        else {
            res.status(500).json({ error: "Tweet not deleted" });
        }

    } catch (error){
        console.log(error);
        res.status(500).json({ "error": error });
    }
}