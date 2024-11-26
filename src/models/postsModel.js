import 'dotenv/config';
import { ObjectId } from "mongodb";
// Importa a função dbConnections para estabelecer a conexão com o banco de dados.
import dbConnections from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados MongoDB usando a URL fornecida na variável de ambiente MONGODB_URL.
const connection = await dbConnections(process.env.MONGODB_URL);

// Função assíncrona para obter todos os posts do banco de dados.
export async function getAllPosts() {
  const db = connection.db("alura-instabytes")
  const collection = db.collection("posts");

  return collection.find().toArray();
}

export async function createPost(newPost) {
  const db = connection.db("alura-instabytes")
  const collection = db.collection("posts");

  return collection.insertOne(newPost);
}

export async function updatePost(id, updatedPost) {
  const db = connection.db("alura-instabytes")
  const collection = db.collection("posts");
  const objId = ObjectId.createFromHexString(id);

  return collection.updateOne({_id: new ObjectId(objId)}, {$set: updatedPost});
}