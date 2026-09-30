# Todo List

Inicialização do Projeto

O projeto possui frontend e backend separados. É necessário iniciar os dois em terminais diferentes.

Terminal 1 — Frontend

Local: pasta raiz do projeto

npm run dev

Terminal 2 — Backend

Local: pasta backend/

npm run dev

Após iniciar os dois servidores, o frontend estará disponível em http://localhost:3000 e a API em http://localhost:3333.
Aplicação web para gerenciamento de tarefas com autenticação de usuários, CRUD de tarefas, filtros, busca e controle de acesso.

## 1. Descrição Geral

### Objetivo

Desenvolver uma aplicação de gerenciamento de tarefas onde cada usuário possa criar, visualizar, editar, concluir e excluir suas próprias tarefas.

### Tecnologias

**Frontend**

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Lucide React

**Backend**

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Neon
- JWT
- bcrypt
- Zod

---

# 2. Estrutura do Projeto

todolist/
├── app/
├── components/
├── public/
├── backend/
├── package.json
└── README.md

```

## Frontend


app/
├── dashboard/
├── login/
└── register/
```

- `app/dashboard`: tela principal de gerenciamento das tarefas.
- `app/login`: autenticação do usuário.
- `app/register`: cadastro de novos usuários.

components/dashboard/
├── api.ts
├── CreateTaskModal.tsx
├── EditTaskModal.tsx
├── Filters.tsx
├── Header.tsx
├── Navbar.tsx
├── Searchbar.tsx
├── Status.tsx
├── Task.tsx
└── ui/

```

- `api.ts`: comunicação com a API.
- `CreateTaskModal.tsx`: criação de tarefas.
- `EditTaskModal.tsx`: edição e exclusão.
- `Filters.tsx`: filtros e ordenação.
- `Header.tsx`: cabeçalho do dashboard.
- `Navbar.tsx`: navegação.
- `Searchbar.tsx`: busca de tarefas.
- `Status.tsx`: filtro por status.
- `Task.tsx`: apresentação individual da tarefa.
- `ui/`: componentes reutilizáveis da interface.

## Backend


backend/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── middlewares/
│   ├── lib/
│   ├── app.ts
│   └── server.ts
├── prisma/
└── prisma.config.ts
```

- `controllers/`: recebe requisições, valida dados e retorna respostas HTTP.
- `services/`: concentra as regras de negócio.
- `middlewares/`: autenticação e proteção das rotas.
- `lib/`: configuração e acesso ao Prisma.
- `app.ts`: configuração do Express.
- `server.ts`: inicialização do servidor.
- `prisma/`: schema e migrations do banco.
- `prisma.config.ts`: configuração do Prisma.

---

# 3. Modelagem do Banco de Dados

O banco utilizado é PostgreSQL através do Neon.

## User

Representa os usuários da aplicação.

Principais campos:

id
name
email
passwordHash
createdAt

```

## Task

Representa as tarefas.

Principais campos:


id
title
description
completed
createdAt
updatedAt
userId
```

## Relacionamento

Um usuário pode possuir várias tarefas.

User 1 ───────── N Task

```

Cada `Task` possui um `userId` que identifica seu proprietário.

O acesso às tarefas sempre considera o usuário autenticado.

---

# 4. Funções Principais

## Autenticação

### `registerUser()`

Responsável por:

- verificar se o email já existe;
- gerar o hash da senha;
- criar o usuário;
- gerar o JWT.

### `loginUser()`

Responsável por:

- localizar o usuário;
- comparar a senha utilizando bcrypt;
- gerar o JWT;
- retornar os dados públicos do usuário.

---

## Tarefas

### `createTask()`

Cria uma tarefa vinculada ao usuário autenticado.

### `getTasks()`

Lista somente as tarefas pertencentes ao usuário autenticado.

### `getTaskById()`

Busca uma tarefa considerando o ID da tarefa e o ID do usuário.

### `updateTask()`

Atualiza título, descrição e/ou status da tarefa.

### `deleteTask()`

Remove uma tarefa pertencente ao usuário autenticado.

---

# 5. Rotas da API

Todas as rotas de tarefas exigem autenticação através de JWT.

## Autenticação

### `POST /api/auth/register`

Cria um usuário.

Valida:

- nome;
- email;
- senha;
- tamanho dos campos;
- campos não permitidos.

### `POST /api/auth/login`

Realiza o login.

Valida:

- email;
- senha.

---

## Tarefas

### `POST /api/tasks`

Cria uma tarefa.

Valida:

- título;
- descrição;
- tamanho máximo dos campos.

O `userId` é obtido através do token, não do corpo da requisição.

### `GET /api/tasks`

Lista as tarefas do usuário autenticado.

### `GET /api/tasks/:id`

Busca uma tarefa específica.

A consulta verifica o ID da tarefa e o usuário autenticado.

### `PUT /api/tasks/:id`

Atualiza uma tarefa.

Pode alterar:

- título;
- descrição;
- status.

### `DELETE /api/tasks/:id`

Exclui uma tarefa.

A operação só é permitida para tarefas pertencentes ao usuário autenticado.

---

# 6. Segurança Aplicada

### Hash de senhas

As senhas não são armazenadas em texto puro.

É utilizado `bcrypt` para gerar o `passwordHash`.

### Proteção de rotas

As rotas privadas utilizam JWT.

O middleware verifica o token antes de permitir o acesso aos recursos protegidos.

### Isolamento de dados

As operações de tarefas utilizam o `userId` autenticado.

Um usuário não consegue acessar, alterar ou excluir tarefas de outro usuário.

### Validação de input

O backend utiliza Zod para validar os dados recebidos.

Também são aplicados limites de tamanho e rejeição de propriedades não previstas.

### SQL Injection

O acesso ao PostgreSQL é realizado através do Prisma, sem concatenação de SQL fornecido pelo usuário.

### XSS

O frontend utiliza a renderização padrão do React, que realiza escaping de conteúdo textual.

O projeto não utiliza `dangerouslySetInnerHTML` para conteúdo fornecido pelo usuário.

### Tratamento de erros

A API utiliza códigos HTTP apropriados, como:


400 Dados inválidos
401 Não autorizado
404 Recurso não encontrado
409 Conflito
500 Erro interno
```

Mensagens de erro internas não são expostas diretamente ao cliente.

---

# 7. Fluxo de Uso do Sistema

Cadastro
↓
Login
↓
JWT
↓
Dashboard
↓
Criar / visualizar tarefas
↓
Editar / concluir / excluir
↓
Buscar e filtrar tarefas

```

O usuário autenticado somente possui acesso às suas próprias tarefas.

---

# 8. Como Executar

## Backend

Local:


backend/
```

Instalar dependências:

```bash
npm install
```

Configurar as variáveis de ambiente:

```env
DATABASE_URL=
DIRECT_URL=
JWT_SECRET=
```

Executar:

```bash
npm run dev
```

API:

http://localhost:3333/api

```

## Frontend

Local:


raiz do projeto/
```

Instalar dependências:

```bash
npm install
```

Configurar:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333/api
```

Executar:

```bash
npm run dev
```

---

# 9. Validação do Projeto

Para verificar o build do frontend:

Local:

raiz do projeto/

````

```bash
npm run build
````

Para verificar o build do backend:

Local:

backend/

````

```bash
npm run build
````

Ambos foram validados sem erros durante o desenvolvimento.
