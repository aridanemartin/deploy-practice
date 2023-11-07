console.log("isApiMock", process.env.API_MOCK);
export const envConstants = {
    isProduction: process.env.NODE_ENV === "production",
    PORT: process.env.PORT,
    isApiMock: process.env.API_MOCK,
    MONGODB_URI: process.env.MONGODB_URI,
};
