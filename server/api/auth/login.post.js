import { getUserByEmail } from "~~/server/db/users";
import { userTransformer } from "~~/server/transformers/user";
import { comparePassword } from "~~/server/db/bcrypt";
import { generateTokens } from "~~/server/token/jwt";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    const { email, password } = body
    
    if (!email || !password) {
        return sendError(
          event,
          createError({
            statusCode: 400,
            statusMessage: "All fields are required",
          })
        );
    }  


    //Is the user registered
    const user =  await getUserByEmail(email)

    if (!user) {
        return sendError(
          event,
          createError({
            statusCode: 404,
            statusMessage: "User does not exist",
          })
        );
    }


    //Compare passwords
    const check = await comparePassword(password, user.password)
    if(!check){
        return sendError(
          event,
          createError({
            statusCode: 400,
            statusMessage: "Password is Invalid",
          })
        );
    }

    //Generate Tokens

    //Access token
    // Refresh token

    const { accessToken, refreshToken } = generateTokens(user)

    //Save it inside db


    //Add http only cookie
    return {
      access_token: accessToken,
      user: userTransformer(user)
    };
})