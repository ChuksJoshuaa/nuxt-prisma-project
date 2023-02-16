export const tweetTransformer = (tweet) => {
  return {
    idL: tweet.id,
    text: tweet.text,
  };
};
