import { ObjectId } from "mongodb";
export const mapHouseFromApiToModel = (house) => ({
    _id: new ObjectId(house._id),
    name: house.name,
    description: house.description,
    images: house.images,
    address: house.address,
    bedrooms: house.bedrooms,
    beds: house.beds,
    bathrooms: house.bathrooms,
    last5reviews: house?.reviews?.slice(0, 5).map((review) => ({
        id: review._id,
        comment: review.comments,
        userId: review.userId,
        createdAt: review.createdAt,
    })),
});
export const mapHouseListFromModelToApi = (houseList) => houseList.map(mapHouseFromModelToApi);
export const mapHouseFromModelToApi = (house) => ({
    id: typeof house._id === "object" ? house._id.toHexString() : "",
    name: house.name,
    description: house.description,
    images: house.images,
    address: house.address,
    bedrooms: house.bedrooms,
    beds: house.beds,
    bathrooms: house.bathrooms,
    last5reviews: house?.reviews?.slice(0, 5).map((review) => ({
        id: review._id,
        comment: review.comments,
        userId: review.userId,
        createdAt: review.createdAt,
    })),
});
