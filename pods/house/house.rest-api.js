import { houseRepository } from "#dals/house/index.js";
import { Router } from "express";
import { mapHouseFromModelToApi, mapHouseListFromModelToApi, } from "./house.mappers.js";
export const housesApi = Router();
housesApi
    .get("/", async (req, res) => {
    try {
        const page = Number(req.query.page);
        const pageSize = Number(req.query.pageSize);
        const houseList = await houseRepository.findAll(page, pageSize);
        res.send(mapHouseListFromModelToApi(houseList));
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})
    .get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const house = await houseRepository.findById(id);
        if (house) {
            res.send(mapHouseFromModelToApi(house));
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})
    .post("/:id", async (req, res) => {
    try {
        const house = await houseRepository.saveHouse(req.body);
        res.send(house);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})
    .post("/review/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const house = await houseRepository.addReview(id, req.body);
        res.send(house);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
