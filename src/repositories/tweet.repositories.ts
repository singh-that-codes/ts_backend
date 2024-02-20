import mongoose from "mongoose";
import TweetModel from "../database/models/tweet.model";
import { ITweetInterface } from "../database/interfaces/tweet.interface";

export const getTweetRepo = async (TweetId: string): Promise<ITweetInterface | null> => {
    try {
        const Tweet = await TweetModel.findOne({ tweetId: TweetId });
        return Tweet;
        console.log(Tweet);
    }
    catch (error) {
        console.log(error);
        return null;
    }
};

export const deleteTweetRepo = async (TweetId: string): Promise<boolean> => {
    try {
        const deleted = await TweetModel.findOneAndDelete({ tweetId: TweetId });
        if (deleted) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
};

export const createTweetRepo = async (Tweet: ITweetInterface): Promise<boolean> => {
    try {
        await TweetModel.create(Tweet);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};

export const udpateTweetRepo = async (TweetId : string,updatedTweet: ITweetInterface): Promise<boolean> => {
    try {
        const result = await TweetModel.findOneAndUpdate(
            { tweetId: TweetId },
            updatedTweet,
            { new: true }
        );
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
