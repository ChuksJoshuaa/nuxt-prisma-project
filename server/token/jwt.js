import jwt from "jsonwebtoken"
import { __prod__, REFRESH_TOKEN } from "../constant";

const generateAccessToken = (user) => {
    const config = useRuntimeConfig()
    //Config coming from nuxt.config.js and .env values were used there.
    return jwt.sign({
        userId: user.id
    }, config.jwtAccessSecret, { expiresIn: config.jwtAccessLifetime } )
}


const generateRefreshToken = (user) => {
    
    const config = useRuntimeConfig();
    return jwt.sign(
      {
        userId: user.id,
      },
      config.jwtRefreshSecret,
      { expiresIn: config.jwtRefreshLifetime }
    );
}


export const generateTokens = (user) => {
    const accessToken = generateAccessToken(user) 
    const refreshToken = generateRefreshToken(user)

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    }
}

export const sendRefreshToken = (event, token) => {
    const response = event !== undefined ? event : null

    setCookie(response, REFRESH_TOKEN, token, {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      httpOnly: !__prod__,
      secure: !__prod__,
      sameSite: "lax"
    });
}