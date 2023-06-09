import {ObjectId} from "mongodb";
import {sendMethodNotAllowed, sendOk} from "@/js/utils/apiMethods";
import {getCollection} from "@/js/utils/functions";

const COLLECTION_NAME = 'records';

const getRecords = async () => {
    const collection = await getCollection(COLLECTION_NAME);
    return collection.find({}).toArray();
}

const getRecord = async (id) => {
    const collection = await getCollection(COLLECTION_NAME);
    return collection.findOne({_id: new ObjectId(id)});
}

const postRecord = async (record) => {
    if (
        !record ||
        !record.name ||
        !record.countryCode ||
        typeof record.temperature !== "number" ||
        !record.weather
    ) {
        throw new Error("Invalid record data");
    }

    const collection = await getCollection(COLLECTION_NAME);
    const existingRecord = await collection.findOne({
        name: record.name,
        countryCode: record.countryCode,
    });

    if (existingRecord) {
        await collection.updateOne(
            { _id: existingRecord._id },
            { $set: { weather: record.weather, temperature: record.temperature } }
        );
        return existingRecord._id;
    } else {
        return collection.insertOne(record);
    }
};


const putRecord = async (record) => {
    const collection = await getCollection(COLLECTION_NAME);
    const id = record._id;
    delete record._id;
    return collection.updateOne({_id: new ObjectId(id)}, {$set: record});
}

const deleteRecord = async (id) => {
    const collection = await getCollection(COLLECTION_NAME);
    return collection.deleteOne({_id: new ObjectId(id)});
}

export default async function handler(req, res) {

    const isAllowedMethod = req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE';
    if (!isAllowedMethod) {
        return sendMethodNotAllowed(res);
    }

    if (req.method === 'GET' && req.query.id) {
        const id = req.query.id;
        const record = await getRecord(id);
        return sendOk(res, record);
    } else if (req.method === 'GET') {
        const records = await getRecords();
        return sendOk(res, records);
    } else if (req.method === 'POST') {
        const record = req.body;
        const result = await postRecord(record);
        return sendOk(res, result);
    } else if (req.method === 'PUT') {
        const record = req.body;
        const result = await putRecord(record);
        return sendOk(res, result);
    } else if (req.method === 'DELETE') {
        const id = req.query.id;
        const result = await deleteRecord(id);
        return sendOk(res, result);
    }
}
