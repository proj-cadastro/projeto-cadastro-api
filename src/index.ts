import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import { userRouter } from "./modules/Users/userRoute";
import { professorRouter } from "./modules/Professors/professorRoute";
import { courseRouter } from "./modules/Courses/courseRoute";
import { authRouter } from "./modules/Auth/authRoute";
import { swaggerDocs, swaggerUi } from "./docs/swaggerConfig";

AppDataSource.initialize()
  .then(() => {
    const app = express();
    const API_PORT = process.env.API_PORT ?? 3000;

    app.use(cors());

    app.use(express.json());

    app.use("/auth", authRouter);
    app.use("/users", userRouter);
    app.use("/professors", professorRouter);
    app.use("/courses", courseRouter);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    app.listen(API_PORT, () => {
      console.log(`Servidor rodando na porta ${API_PORT} 🚀`);
      console.log(`Documentação disponível em http://localhost:${API_PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error("Erro ao inicializar o banco de dados:", error);
  });
