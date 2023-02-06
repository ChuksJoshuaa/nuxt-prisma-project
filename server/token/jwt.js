import jwt from "jsonwebtoken"

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