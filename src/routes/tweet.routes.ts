import { Router } from "express";
import { createTweetController, deleteTweetController, getTweetController, updateTweetController } from "../controllers/tweet.controller";

const tweetRouter = Router();

//Defining route paths

tweetRouter.get("/:TweetId", getTweetController)
tweetRouter.post("/", createTweetController)
tweetRouter.delete(":/TweetId", deleteTweetController)
tweetRouter.put("/", updateTweetController)

export default tweetRouter
