import "dotenv/config";
import app from "./app.js";
import prisma from "./lib/prisma.js";

const PORT = 3333;

async function startServer() {
  try {
    await prisma.$connect();

    console.log("Banco de dados conectado");

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
}

startServer();
