import { MongoClient } from "mongodb";

console.log("URI:", process.env.MONGODB_URI) 
const client = new MongoClient(process.env.MONGODB_URI as string);

export default client.connect();