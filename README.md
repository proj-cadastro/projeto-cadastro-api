
# 📚 API de Gerenciamento de Usuários, Professores e Cursos

Este projeto é uma API desenvolvida em Node.js com TypeScript, utilizando Express e MongoDB, para gerenciar dados de usuários, professores e cursos. A API oferece operações CRUD (criação, leitura, atualização e exclusão) para cada entidade, com autenticação por token JWT e documentação interativa via Swagger.

## 🛠 Funcionalidades

- Operações CRUD para usuários, professores e cursos.
- Autenticação de rotas utilizando JWT.
- Documentação interativa da API com Swagger.
- Banco de dados MongoDB para armazenamento de dados.

## 💻 Tecnologias Utilizadas
<p>
   <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/VSCode-Dark.svg" alt="VSCode" width="50"/>
   <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/Git.svg" alt="Git" width="50"/>
   <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/Github-Dark.svg" alt="Github" width="50"/>
   <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/TypeScript.svg" alt="Typescript" width="50"/>
   <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/NodeJS-Dark.svg" alt="NodeJs" width="50"/>
   <img src="https://github.com/tandpfun/skill-icons/blob/main/icons/MongoDB.svg" alt="MongoDB" width="50"/>
</p>

- **VSCode**: IDE para desenvolvimento.
- **Git e Github**: Controle de versionamento.
- **TypeScript**: Linguagem principal da API.
- **Node.js e Express**: Backend e rotas.
- **MongoDB**: Banco de dados para armazenamento.

## 🧩 Requisitos

- [Node.js](https://nodejs.org/) instalado no sistema.
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) ou uma instância local do MongoDB.

## ⚙ Configuração do Projeto

1. Clone o repositório do projeto:

   ```bash
   git clone <url-do-repositorio>
   cd api-gerenciamento
   ```

2. Instale as dependências do Node.js:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```plaintext
   MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome_do_banco>?retryWrites=true&w=majority
   JWT_SECRET=sua_chave_secreta
   API_PORT=3000
   ```

4. Inicie o servidor localmente:

   ```bash
   npm run dev
   ```

5. A API estará rodando em `http://localhost:3000`. A documentação estará disponível em `http://localhost:3000/api-docs`.

## 📂 Estrutura do Projeto

```plaintext
|-- src
|   |-- controllers   # Controladores das requisições da API
|   |-- services      # Lógica de negócios
|   |-- routes        # Rotas da API
|   |-- types         # Tipos e enums
|   |-- docs          # Documentação Swagger
|-- .env              # Variáveis de ambiente
|-- tsconfig.json     # Configuração do TypeScript
|-- README.md         # Documentação do projeto
```

## 🛣 Endpoints da API

### Usuários

#### Listar todos os usuários

- **Endpoint**: `GET /users`
- **Descrição**: Retorna todos os usuários cadastrados.

#### Criar um novo usuário

- **Endpoint**: `POST /users`
- **Descrição**: Cria um novo usuário.
- **Exemplo de JSON**:

  ```json
  {
    "username": "example",
    "email": "example@example.com",
    "password": "123456"
  }
  ```

### Professores

#### Listar todos os professores

- **Endpoint**: `GET /professors`
- **Descrição**: Retorna todos os professores cadastrados.

#### Criar um novo professor

- **Endpoint**: `POST /professors`
- **Descrição**: Cria um novo professor.
- **Exemplo de JSON**:

  ```json
  {
    "name": "Professor Exemplo",
    "email": "professor@example.com",
    "titration": "doctor"
  }
  ```

### Cursos

#### Listar todos os cursos

- **Endpoint**: `GET /courses`
- **Descrição**: Retorna todos os cursos cadastrados.

#### Criar um novo curso

- **Endpoint**: `POST /courses`
- **Descrição**: Cria um novo curso.
- **Exemplo de JSON**:

  ```json
  {
    "name": "Curso Exemplo",
    "codCourse": "CUR123",
    "model": "in-person"
  }
  ```

## 🛡 Segurança

- **Autenticação JWT**: Para proteger as rotas, é necessário enviar um token válido no cabeçalho `Authorization`.

## 🚀 API Publicada

- **Plataforma utilizada**: [Render](https://render.com)
- **URL da API:** [URL API](projeto-cadastro-api.onrender.com)
- **Documentação swagger:** [Documentação API](projeto-cadastro-api.onrender.com/api-docs)

## 🧩 Contribuição

1. Faça um fork do projeto.
2. Crie uma nova branch com suas alterações (`git checkout -b feature/nova-funcionalidade`).
3. Faça commit de suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

## 📝 Licença

Este projeto está licenciado sob a licença MIT.
