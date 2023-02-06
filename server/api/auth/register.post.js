import { createUser } from "~~/server/db/users";
import { sendError } from "h3";
import { userTransformer } from "~~/server/transformers/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, email, password, repeatPassword, name, profileImage } = body;

  if (!username || !name || !email || !password || !repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "All fields are required" })
    );
  }
    if (password.length < 5 || repeatPassword.length < 5) {
        return sendError(
            event,
            createError({ statusCode: 400, statusMessage: "Passwords must be at least 5 characters long" })
        );
    }
    if (password!== repeatPassword) {
        return sendError(
            event,
            createError({ statusCode: 400, statusMessage: "Passwords do not match" })
        );
    }

    if(email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    ) === null) {
        return sendError(
            event,
            createError({ statusCode: 400, statusMessage: "Invalid email address" })
        );
    }
    
    const userData = {
        username,
        email,
        password, 
        name,
        profileImage,
    }
    
    const user = await createUser(userData)

  return {
      body: userTransformer(user)
  };
});
