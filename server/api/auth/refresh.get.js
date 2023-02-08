import { sendError, getCookie } from "h3";
import { REFRESH_TOKEN } from "../../constant";
import { getRefreshTokenByToken } from "~~/server/db/refreshToken";
import { decodeRefreshToken, generateTokens } from "~~/server/token/jwt";
import { getUserById } from "~~/server/db/users";

export default defineEventHandler(async (event) => {
    const refreshToken = getCookie(event, REFRESH_TOKEN);

  if (!refreshToken) {
    return sendError(
      event,
      createError({
        statusCode: 401,
        message: "Refresh token is invalid",
      })
    );
  }
    
    const rToken = await getRefreshTokenByToken(refreshToken)

    if (!rToken) {
      return sendError(
        event,
        createError({
          statusCode: 401,
          message: "Refresh token is invalid",
        })
      );
    }

    const token = await decodeRefreshToken(refreshToken);

    try {
        const user = await getUserById(token.userId)

        const { accessToken } = generateTokens(user)

        return {
            access_token: accessToken,
        }
    }
    catch (error) {
        return sendError(
          event,
          createError({
            statusCode: 500,
            message: "Something went wrong",
          })
        );
    }
});
