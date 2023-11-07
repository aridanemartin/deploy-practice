import express from "express";
import cors from "cors";
export const createRestApiServer = () => {
    const restApiServer = express();
    restApiServer.use(express.json());
    restApiServer.use(cors());
    return restApiServer;
};
