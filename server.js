import express from "express";

const app = express();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/api", (req, res) => {
  res.status(200).send("Backend API is running");
});

app.get("/api/book", (req, res) => {
  res.status(200).send({
    "titulo": "O Senhor dos Anéis",
    "autor": "J.R.R. Tolkien",
    "ano": 1954,
    "genero": "Fantasia"
  });
});