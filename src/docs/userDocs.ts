const userDocs = {
    paths: {
      "/users": {
        get: {
          summary: "Listar todos os usuários",
          tags: ["Users"],
          responses: {
            200: {
              description: "Lista de usuários",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
            404: {
              description: "Nenhum usuário encontrado",
            },
          },
        },
        post: {
          summary: "Criar um novo usuário",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          responses: {
            201: {
              description: "Usuário criado com sucesso",
            },
            400: {
              description: "Requisição inválida",
            },
          },
        },
      },
      "/users/{id}": {
        get: {
          summary: "Buscar usuário por ID",
          tags: ["Users"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "ID do usuário",
            },
          ],
          responses: {
            200: {
              description: "Usuário encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" },
                },
              },
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
        delete: {
          summary: "Deletar um usuário",
          tags: ["Users"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "ID do usuário",
            },
          ],
          responses: {
            200: {
              description: "Usuário deletado com sucesso",
            },
            404: {
              description: "Usuário não encontrado",
            },
          },
        },
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID do usuário" },
          username: { type: "string", description: "Nome de usuário" },
          email: { type: "string", description: "E-mail do usuário" },
          password: { type: "string", description: "Senha do usuário" },
          type: { type: "string", description: "Tipo de usuário", enum: ["user", "admin"] },
        },
      },
    },
  };
  
  export default userDocs;
  