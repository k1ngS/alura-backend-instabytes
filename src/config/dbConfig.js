import { MongoClient } from "mongodb";

export default async function dbConnections(connection) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(connection);
    console.log(`Connecting to ${connection}`);
    await mongoClient.connect();
    console.log("Connected successfully to server");
    return mongoClient;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit();
  }
}