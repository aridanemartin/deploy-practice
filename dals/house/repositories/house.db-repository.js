import { ObjectId } from "mongodb";
import { db } from "../../../core/servers/index.js";
export const housedbRepository = {
    findAll: async (page, pageSize) => {
        const skip = Boolean(page) ? (page - 1) * pageSize : 0;
        const limit = pageSize ?? 0;
        const result = await db
            ?.collection("listingsAndReviews")
            .find()
            .skip(skip)
            .limit(limit)
            .toArray();
        return result;
    },
    findById: async (id) => {
        console.log("findById in db repo");
        const result = await db
            ?.collection("listingsAndReviews")
            .findOne({ _id: new ObjectId(id) });
        return result;
    },
    saveHouse: async (house) => {
        return await db?.collection("listingsAndReviews").findOneAndUpdate({
            _id: house._id,
        }, { $set: house }, { upsert: true, returnDocument: "after" });
    },
    addReview: async (id, review) => {
        return await db?.collection("listingsAndReviews").findOneAndUpdate({
            _id: new ObjectId(id),
        }, {
            $push: {
                reviews: {
                    _id: new ObjectId(),
                    date: new Date(),
                    reviewer_name: review.reviewerName,
                    comments: review.comments,
                },
            },
        }, { upsert: false, returnDocument: "after" });
    },
};
