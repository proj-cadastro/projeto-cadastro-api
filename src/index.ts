import express  from "express";
import { AppDataSource } from "./data-source";
import { userRouter } from "./modules/Users/userRoute";
import { professorRouter } from "./modules/Professors/professorRoute";
import { courseRouter } from "./modules/Courses/courseRoute";
import { authRouter } from "./modules/Auth/authRoute";

AppDataSource.initialize().then(() => {
    const app = express()
    const API_PORT = process.env.API_PORT ?? 3000

    app.use(express.json())

    app.use("/auth", authRouter);
    app.use("/users", userRouter);
    app.use("/professors", professorRouter);
    app.use("/courses", courseRouter);

    return app.listen(API_PORT, () => {
        console.log(`Servidor rodando na porta ${API_PORT} 🚀`);
    })
}).catch((error: any) => console.log(error));