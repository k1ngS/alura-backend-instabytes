// Importa o framework Express para criar a aplicação web.
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância da aplicação Express.
const app = express();
app.use(express.static("uploads"))
routes(app);

// Inicia o servidor Express na porta 3000 e exibe uma mensagem no console.
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
