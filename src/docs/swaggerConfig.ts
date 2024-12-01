import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userDocs from "./userDocs";
import professorDocs from "./professorDocs";
import courseDocs from "./courseDocs";

const PORT = process.env.API_PORT ? process.env. API_PORT : 3000

const SERVER_URL = process.env.NODE_ENV === "production"
  ? "https://projeto-cadastro-api.onrender.com"
  : `http://localhost:${PORT}`;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "API para gerenciar usuários, professores e cursos.",
  },
  servers: [
    {
      url: SERVER_URL,
      description: process.env.NODE_ENV === "production"
        ? "Servidor de produção"
        : "Servidor local para desenvolvimento",
    },
  ],
  paths: {
    ...userDocs.paths,
    ...professorDocs.paths,
    ...courseDocs.paths,
  },
  components: {
    schemas: {
      ...userDocs.schemas,
      ...professorDocs.schemas,
      ...courseDocs.schemas,
    },
  },
};

const swaggerDocs = swaggerJsdoc({ definition: swaggerDefinition, apis: [] });

export { swaggerDocs, swaggerUi };
