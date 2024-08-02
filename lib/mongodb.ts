import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string ;
const client = new MongoClient(uri);

export async function connectToDatabase() {

    await client.connect();

    const db = client.db("your-database-name"); 
    return db;
}
