import { getUserByEmail } from "~~/server/db/users";
import { userTransformer } from "~~/server/transformers/user";
import { comparePassword } from "~~/server/db/bcrypt";
import { generateTokens, sendRefreshToken } from "~~/server/token/jwt";
import { createRefreshToken } from "~~/server/db/refreshToken";
import { sendError } from "h3"

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
    const { accessToken, refreshToken } = generateTokens(user)

    //Save it inside db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    //Add http only cookies
    sendRefreshToken(event, refreshToken)
     

    return {
      access_token: accessToken,
      user: userTransformer(user)
    };
})