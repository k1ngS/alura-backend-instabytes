import express from "express";
import multer from "multer";
import cors from "cors";

import { publishPost, listAllPosts, uploadImage, updateNewPost } from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({
  dest: "./uploads",
  storage
})

const routes = (app) => {
  // Habilita o parsing de JSON para requisições HTTP.
  app.use(express.json());

  app.use(cors(corsOptions))

  // Define uma rota GET para o caminho "/posts".
  app.get("/posts", listAllPosts);

  app.post("/posts", publishPost)
  app.post("/upload", upload.single("image"), uploadImage)

  app.put("/upload/:id", updateNewPost);
}

export default routes;