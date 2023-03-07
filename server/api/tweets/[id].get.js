import { getTweetById } from "~~/server/db/tweets";
import { tweetTransformer } from "~~/server/transformers/tweet";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  const tweet = await getTweetById(id, {
    include: {
      author: true,
      mediaFiles: true,
      replyTo: {
        include: {
          author: true,
        },
      },
      replies: {
        include: {
          mediaFiles: true,
          author: true,
          replyTo: {
            include: {
              author: true,
            },
          },
        },
      },
    },
  });

  return {
    tweet: tweetTransformer(tweet),
  };
});
