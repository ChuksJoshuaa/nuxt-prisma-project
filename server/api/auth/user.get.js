import { userTransformer } from "~~/server/transformers/user";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  return {
    user: userTransformer(event.context.auth?.user),
  };
});
