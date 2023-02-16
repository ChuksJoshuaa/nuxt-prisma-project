import { prisma } from "./index";

export const createTweet = (tweetData) => {
  return prisma.tweet.create({
    data: tweetData,
  });
};
