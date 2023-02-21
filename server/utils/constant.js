const config = useRuntimeConfig();

export const __prod__ = config.nodeEnv === "production";
export const REFRESH_TOKEN = "refresh_token";