import { getUserByUsername } from "~~/server/db/users";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    const { username, password } = body
    
    if (!username || !password) {
        return sendError(
          event,
          createError({
            statusCode: 400,
            statusMessage: "All fields are required",
          })
        );
    }  


    //Is the user registered
    const user = getUserByUsername(username)

    if (!user) {
        return sendError(
          event,
          createError({
            statusCode: 400,
            statusMessage: "Username or password is Invalid",
          })
        );
    }


    //Compare passwords

    //Generate Tokens
})