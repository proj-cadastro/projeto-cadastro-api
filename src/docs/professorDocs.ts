const professorDocs = {
    paths: {
      "/professors": {
        get: {
          summary: "Listar todos os professores",
          tags: ["Professors"],
          responses: {
            200: {
              description: "Lista de professores",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Professor" },
                  },
                },
              },
            },
            404: {
              description: "Nenhum professor encontrado",
            },
          },
        },
        post: {
          summary: "Criar um novo professor",
          tags: ["Professors"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Professor" },
              },
            },
          },
          responses: {
            201: {
              description: "Professor criado com sucesso",
            },
            400: {
              description: "Requisição inválida",
            },
          },
        },
      },
      "/professors/{id}": {
        get: {
          summary: "Buscar professor por ID",
          tags: ["Professors"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "ID do professor",
            },
          ],
          responses: {
            200: {
              description: "Professor encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Professor" },
                },
              },
            },
            404: {
              description: "Professor não encontrado",
            },
          },
        },
        put: {
          summary: "Atualizar informações do professor",
          tags: ["Professors"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "ID do professor",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Professor" },
              },
            },
          },
          responses: {
            200: {
              description: "Professor atualizado com sucesso",
            },
            404: {
              description: "Professor não encontrado",
            },
          },
        },
        delete: {
          summary: "Deletar um professor",
          tags: ["Professors"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "ID do professor",
            },
          ],
          responses: {
            200: {
              description: "Professor deletado com sucesso",
            },
            404: {
              description: "Professor não encontrado",
            },
          },
        },
      },
    },
    schemas: {
      Professor: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID do professor" },
          name: { type: "string", description: "Nome do professor" },
          email: { type: "string", description: "E-mail do professor" },
          titration: {
            type: "string",
            description: "Titulação do professor",
            enum: ["doctor", "master", "specialist"],
          },
          unitId: { type: "string", description: "ID da unidade do professor" },
          reference: { type: "string", description: "Referência do professor" },
          lattes: { type: "string", description: "Currículo Lattes do professor" },
        },
      },
    },
  };
  
  export default professorDocs;
  