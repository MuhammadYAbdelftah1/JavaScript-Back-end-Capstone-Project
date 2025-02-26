const { MongoClient } = require('mongodb');
require('dotenv').config();

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    return client.db("jsCapstoneDB"); // Use your database name
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas", err);
    throw err;
  }
}

module.exports = { connectToDatabase };