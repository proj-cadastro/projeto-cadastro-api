const courseDocs = {
    paths: {
      "/courses": {
        get: {
          summary: "Listar todos os cursos",
          tags: ["Courses"],
          responses: {
            200: {
              description: "Lista de cursos",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Course" },
                  },
                },
              },
            },
            404: {
              description: "Nenhum curso encontrado",
            },
          },
        },
        post: {
          summary: "Criar um novo curso",
          tags: ["Courses"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Course" },
              },
            },
          },
          responses: {
            201: {
              description: "Curso criado com sucesso",
            },
            400: {
              description: "Requisição inválida",
            },
          },
        },
      },
      "/courses/{id}": {
        get: {
          summary: "Buscar curso por ID",
          tags: ["Courses"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "ID do curso",
            },
          ],
          responses: {
            200: {
              description: "Curso encontrado",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Course" },
                },
              },
            },
            404: {
              description: "Curso não encontrado",
            },
          },
        },
        put: {
          summary: "Atualizar informações do curso",
          tags: ["Courses"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "ID do curso",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Course" },
              },
            },
          },
          responses: {
            200: {
              description: "Curso atualizado com sucesso",
            },
            404: {
              description: "Curso não encontrado",
            },
          },
        },
        delete: {
          summary: "Deletar um curso",
          tags: ["Courses"],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "ID do curso",
            },
          ],
          responses: {
            200: {
              description: "Curso deletado com sucesso",
            },
            404: {
              description: "Curso não encontrado",
            },
          },
        },
      },
    },
    schemas: {
      Course: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID do curso" },
          name: { type: "string", description: "Nome do curso" },
          codCourse: { type: "string", description: "Código do curso" },
          model: {
            type: "string",
            description: "Modelo do curso",
            enum: ["in-person", "blended", "home-school"],
          },
        },
      },
    },
  };
  
  export default courseDocs;
  