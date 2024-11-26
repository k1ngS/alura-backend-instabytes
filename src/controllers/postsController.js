import fs from 'fs';
import { createPost, getAllPosts, updatePost } from "../models/postsModel.js";
import generateDescriptionWithGemini from '../services/geminiService.js';
export async function listAllPosts(req, res) {
  const posts = await getAllPosts();

  res.status(200).json(posts);
}

export async function publishPost(req, res) {
  const newPost = req.body;

  try {
    const createdPost = await createPost(newPost)
    res.status(200).json(createdPost);
  } catch (err) {
    console.error("Error creating post", err.message);
    res.status(500).json({ error: "Error creating post" });
  }
}

export async function uploadImage(req, res) {
  const newPost = {
    description: "",
    imgUrl: req.file.originalname,
    alt: ""
  };

  try {
    const createdPost = await createPost(newPost);
    const refreshImage = `uploads/${createdPost.insertedId}.jpg`;
    fs.renameSync(req.file.path, refreshImage);
    res.status(200).json(createdPost);
  } catch (err) {
    console.error("Error creating post", err.message);
    res.status(500).json({ error: "Error creating post" });
  }
}

export async function updateNewPost(req, res) {
  const id = req.params.id;
  const urlImg = `http://localhost:3000/${id}.jpg`;

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.jpg`);
    const descriptionWithGemini = await generateDescriptionWithGemini(imgBuffer);

    const updatedPost = {
      description: descriptionWithGemini,
      imgUrl: urlImg,
      alt: req.body.alt
    };
    
    const createdPost = await updatePost(id, updatedPost);
    res.status(200).json(createdPost);
  } catch (err) {
    console.error("Error creating post", err.message);
    res.status(500).json({ error: "Error creating post" });
  }
}