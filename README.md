# Todo List — Documentação Técnica

## 1. Visão geral

Este projeto consiste em uma aplicação de gerenciamento de tarefas desenvolvida com uma arquitetura separada entre frontend e backend.

A aplicação permite que usuários criem uma conta, façam login e gerenciem suas próprias tarefas. Cada tarefa pode ser criada, editada, marcada como concluída ou removida.

Além das operações básicas de CRUD, o frontend possui busca, filtro por status, ordenação, filtro por período e atualização otimista do status das tarefas.

O projeto foi desenvolvido com foco em uma estrutura simples, manutenção facilitada, separação de responsabilidades e boas práticas de segurança para uma aplicação web moderna.

# 2. Arquitetura

A aplicação é dividida em duas partes:

todolist/
├── frontend/
│ └── Next.js
│
└── backend/
└── Express + TypeScript + Prisma

### Frontend

Responsável por:

- Interface da aplicação
- Autenticação do usuário
- Gerenciamento de estado da interface
- Consumo da API
- Criação e edição de tarefas
- Busca
- Filtros
- Ordenação
- Feedback visual das operações

Tecnologias principais:

- Next.js 16.3.6
- React
- TypeScript
- Tailwind CSS
- Lucide React

### Backend

Responsável por:

- API REST
- Autenticação
- Autorização
- Regras de negócio
- Validação dos dados
- Comunicação com o banco de dados
- Persistência das tarefas
- Controle de acesso por usuário

Tecnologias principais:

- Node.js 24.13.0
- Express 5.2.1
- TypeScript 6.0.3
- Prisma 7.10.0
- PostgreSQL
- Neon
- JWT
- bcrypt
- Zod

# 3. Banco de dados

O banco utilizado é PostgreSQL hospedado no Neon.

Não foi utilizado PostgreSQL local. A aplicação utiliza duas conexões:

- `DATABASE_URL`: conexão utilizada pela aplicação.
- `DIRECT_URL`: conexão direta utilizada pelas operações administrativas do Prisma.

As credenciais ficam em variáveis de ambiente e não são versionadas no Git.

## Prisma

O projeto utiliza o Prisma 7 com a configuração moderna através de `prisma.config.ts`.

O Prisma Client é utilizado como camada de acesso ao banco, evitando a necessidade de escrever SQL manualmente para as operações da aplicação.

A estrutura possui, principalmente, as entidades:

### User

Representa os usuários cadastrados.

Principais campos:

- `id`
- `name`
- `email`
- `passwordHash`
- `createdAt`

A senha nunca é armazenada em o puro.

### Task

Representa as tarefas do usuário.

Principais campos:

- `id`
- `title`
- `description`
- `completed`
- `createdAt`
- `updatedAt`
- `userId`

Existe uma relação entre `Task` e `User`, permitindo associar cada tarefa ao usuário que a criou.

Também existe um índice para `userId`, favorecendo as consultas das tarefas pertencentes a um determinado usuário.

# 4. Autenticação

A autenticação foi implementada utilizando JWT.

O fluxo é:

Cadastro
↓
Validação com Zod
↓
Hash da senha com bcrypt
↓
Criação do usuário
↓
Geração do JWT
↓
Token retornado ao frontend

No login:

Email + senha
↓
Validação
↓
Busca do usuário
↓
bcrypt.compare()
↓
JWT
↓
Frontend

## Senhas

As senhas são processadas utilizando `bcrypt` com fator de custo 12.

A aplicação nunca salva ou retorna a senha original do usuário.

O backend armazena somente o hash:

passwordHash

## JWT

O token contém o identificador do usuário:

userId

O segredo utilizado para assinar o token é armazenado na variável:

JWT_SECRET

O token possui validade de 7 dias.

# 5. Middleware de autenticação

As rotas protegidas utilizam middleware de autenticação.

O middleware:

1. Obtém o header `Authorization`.
2. Extrai o Bearer Token.
3. Valida o JWT.
4. Recupera o `userId`.
5. Disponibiliza o identificador para os controllers.

As operações de tarefas não dependem de um `userId` enviado pelo frontend.

Isso é importante porque evita que um usuário tente manipular o identificador de outro usuário através do payload da requisição.

# 6. API

A API utiliza uma estrutura REST.

## Autenticação

### `POST /api/auth/register`

Cria uma nova conta.

Exemplo:

json
{
"name": "Pedro",
"email": "pedro@email.com",
"password": "12345678"
}

Retorna os dados públicos do usuário e o JWT.

### `POST /api/auth/login`

Realiza o login.

Exemplo:

json
{
"email": "pedro@email.com",
"password": "12345678"
}

Retorna o usuário autenticado e seu token.

# 7. Tarefas

Todas as rotas de tarefas exigem autenticação.

O token deve ser enviado através de:

http
Authorization: Bearer <token>

## Criar tarefa

http
POST /api/tasks

Exemplo:

json
{
"title": "Estudar TypeScript",
"description": "Revisar generics e utility types"
}

O `userId` não é recebido do cliente. Ele é obtido através do usuário autenticado.

## Listar tarefas

http
GET /api/tasks

Retorna somente as tarefas pertencentes ao usuário autenticado.

As tarefas são inicialmente ordenadas pelas mais recentes.

## Buscar tarefa

http
GET /api/tasks/:id

A busca considera simultaneamente:

taskId

- userId autenticado

Portanto, possuir o ID de uma tarefa não é suficiente para acessar uma tarefa pertencente a outro usuário.

## Atualizar tarefa

http
PUT /api/tasks/:id

Pode atualizar:

json
{
"title": "Novo título",
"description": "Nova descrição",
"completed": true
}

Os campos são opcionais, permitindo atualizações parciais.

## Excluir tarefa

http
DELETE /api/tasks/:id

A tarefa só pode ser removida se pertencer ao usuário autenticado.

Em caso de sucesso, a API retorna:

http
204 No Content

# 8. Organização do backend

O backend foi organizado separando responsabilidades.

Estrutura conceitual:

backend/
├── src/
│ ├── controllers/
│ │ ├── auth.controller.ts
│ │ └── task.controller.ts
│ │
│ ├── services/
│ │ ├── auth.service.ts
│ │ └── task.service.ts
│ │
│ ├── middlewares/
│ │ └── auth.middleware.ts
│ │
│ ├── lib/
│ │ └── prisma.ts
│ │
│ ├── app.ts
│ └── server.ts
│
├── prisma/
├── prisma.config.ts
└── .env

### Controllers

Responsáveis por:

- Receber requisições.
- Validar os dados.
- Chamar os services.
- Definir status HTTP.
- Retornar respostas.

### Services

Concentram as regras relacionadas ao domínio.

Por exemplo:

auth.service.ts

é responsável por cadastro, login, hash de senha e geração do token.

Já:

task.service.ts

concentra as operações de criação, consulta, atualização e remoção das tarefas.

Essa separação evita colocar regra de negócio diretamente dentro dos controllers.

# 9. Validação de dados

O backend utiliza Zod para validar os dados recebidos pela API.

Exemplo:

ts
const createTaskSchema = z
.object({
title: z.string().trim().min(1).max(200),

    description: z.string().trim().min(1).max(2000),

})
.strict();

Além da validação do tipo, existem limites de tamanho.

Atualmente:

| Campo | Limite |
| | : |
| Nome | 100 caracteres |
| Email | 254 caracteres |
| Senha | 128 caracteres |
| Título | 200 caracteres |
| Descrição | 2.000 caracteres |

O `.strict()` também impede que propriedades não previstas sejam aceitas silenciosamente nos objetos validados.

# 10. Segurança contra SQL Injection

As operações do banco são realizadas utilizando Prisma.

Exemplo:

ts
prisma.task.findMany({
where: {
userId,
},
});

Não existem consultas SQL construídas através de concatenação de strings nas operações implementadas.

Também não são utilizados comandos `queryRaw` ou SQL montado manualmente para o CRUD da aplicação.

Dessa forma, os valores fornecidos pelo usuário são tratados como dados pelos mecanismos de consulta do Prisma, em vez de serem incorporados diretamente em uma instrução SQL.

# 11. Proteção contra XSS

O frontend utiliza React para renderizar os dados das tarefas.

Os títulos e descrições são renderizados como o normal, e não como HTML arbitrário.

O projeto não utiliza:

dangerouslySetInnerHTML

para renderizar conteúdo fornecido pelo usuário.

Isso é importante porque o React realiza escaping dos valores interpolados normalmente.

Além disso, o backend aplica validação e limites de tamanho aos campos recebidos.

A combinação utilizada é:

Validação no backend +
Limites de tamanho +
React realizando escaping +
Ausência de dangerouslySetInnerHTML

# 12. Isolamento de dados entre usuários

Um dos pontos importantes da implementação foi garantir que um usuário não consiga manipular tarefas pertencentes a outro usuário.

As consultas utilizam o usuário autenticado como parte da condição.

Exemplo:

ts
prisma.task.findFirst({
where: {
id: taskId,
userId,
},
});

Isso é aplicado principalmente nas operações de:

- Busca
- Atualização
- Exclusão

Assim, mesmo que um usuário descubra o ID de uma tarefa de outro usuário, a API não permite acessá-la.

Durante os testes foram verificadas situações como:

- Acesso sem token → `401`
- Token inválido → `401`
- Usuário tentando acessar tarefa de outro usuário → tarefa não encontrada
- Usuário tentando atualizar tarefa de outro usuário → operação bloqueada
- Usuário tentando excluir tarefa de outro usuário → operação bloqueada

# 13. Frontend

O frontend foi desenvolvido com Next.js e React.

A interface existente foi preservada enquanto a aplicação foi integrada à API.

A página principal do sistema é:

/dashboard

A aplicação possui componentes separados para responsabilidades específicas.

Entre eles:

Header
Navbar
Searchbar
Status
Task
CreateTaskModal
EditTaskModal
Filters
SettingsModal
MessageModal

Essa divisão permite modificar uma parte da interface sem transformar a página principal em um componente monolítico.

# 14. Dashboard

O dashboard apresenta:

- Quantidade de tarefas
- Lista de tarefas
- Busca
- Filtro por status
- Ordenação
- Filtro por data
- Criação de tarefa
- Edição de tarefa
- Exclusão de tarefa
- Alteração do status
- Feedback visual das operações

A quantidade exibida no cabeçalho é baseada nas tarefas carregadas pelo usuário.

# 15. Busca

A busca funciona sobre:

Título
Descrição

A comparação é realizada de forma case-insensitive.

Exemplo conceitual:

"Estudar"

também encontra:

"estudar"

# 16. Filtro por status

A interface permite filtrar as tarefas por:

Todas
Pendentes
Concluídas

O estado do filtro é mantido no frontend e aplicado sobre a lista carregada.

# 17. Sistema de filtros

O dashboard possui filtros adicionais para:

- Ordenação A → Z
- Ordenação Z → A
- Mais recentes
- Data inicial
- Data final

Um cuidado importante foi separar o estado temporário do modal do estado efetivamente aplicado.

O usuário pode modificar as opções dentro do modal sem alterar imediatamente a lista.

Somente ao clicar em:

Aplicar

os filtros são enviados para o estado principal do dashboard.

Isso evita o comportamento de aplicar um filtro enquanto o usuário ainda está escolhendo as opções.

O botão de filtros também possui estado visual:

Sem filtro → cinza
Filtro ativo → azul

# 18. Ordenação

A ordenação é feita no frontend após o conjunto de tarefas ser filtrado.

As opções disponíveis são:

### A → Z

Ordenação pelo título em ordem alfabética crescente.

### Z → A

Ordenação pelo título em ordem alfabética decrescente.

### Mais recentes

Ordenação pelo campo `createdAt`, colocando as tarefas mais recentes primeiro.

# 19. Filtro por período

O usuário pode informar:

Data inicial
Data final

A aplicação compara essas datas com `createdAt`.

A data inicial considera o início do dia e a data final considera o final do dia, evitando excluir tarefas criadas durante o último dia selecionado.

# 20. Criação de tarefas

A criação é realizada através de um modal.

O fluxo é:

Usuário preenche formulário
↓
Frontend envia POST
↓
Backend valida dados
↓
Backend cria tarefa
↓
API retorna tarefa criada
↓
Frontend atualiza a lista
↓
Modal é fechado
↓
Mensagem de sucesso

A tarefa retornada pela API é adicionada diretamente ao estado do dashboard.

Isso evita a necessidade de realizar uma nova requisição de listagem após cada criação.

# 21. Edição de tarefas

A edição utiliza um modal específico.

O usuário pode alterar:

- Título
- Descrição

O frontend envia uma requisição `PUT` para a API.

Após a confirmação do backend, a tarefa correspondente é substituída no estado local.

# 22. Exclusão de tarefas

A exclusão utiliza o endpoint:

DELETE /api/tasks/:id

Antes da remoção existe uma confirmação do usuário.

Após a resposta de sucesso da API, a tarefa é removida do estado local.

# 23. Atualização otimista

A alteração do status da tarefa utiliza uma abordagem de **Optimistic UI**.

Ao clicar no checkbox:

Usuário altera status
↓
Interface atualiza imediatamente
↓
PUT enviado para API
↓
API confirma

Caso a API falhe:

API falha
↓
Estado anterior é restaurado
↓
Mensagem de erro é exibida

Essa abordagem melhora a percepção de velocidade da interface sem abrir mão da consistência.

O estado anterior é armazenado antes da alteração justamente para permitir o rollback.

# 24. Feedback visual

O projeto possui um componente centralizado de mensagens:

components/dashboard/ui/MenssageModal.tsx

Ele suporta os estados:

- `success`
- `error`
- `warning`
- `info`

O componente também possui fechamento automático após determinado período.

Isso evita duplicar lógica de feedback dentro de cada modal ou operação.

# 25. Tratamento de erros

O backend diferencia erros de validação e erros internos.

Exemplo de validação:

http
400 Bad Request

Credenciais inválidas:

http
401 Unauthorized

Email já cadastrado:

http
409 Conflict

Recurso não encontrado:

http
404 Not Found

Exclusão realizada:

http
204 No Content

Erros inesperados são registrados no backend e retornam uma mensagem genérica ao cliente.

Isso evita expor detalhes internos da implementação através da API.

# 26. Variáveis de ambiente

Informações sensíveis e configurações específicas do ambiente não são armazenadas diretamente no código.

Entre as principais variáveis utilizadas estão:

DATABASE_URL
DIRECT_URL
JWT_SECRET
NEXT_PUBLIC_API_URL

O arquivo `.env`/`.env.local` não deve ser versionado no repositório.

Para o frontend, por exemplo:

NEXT_PUBLIC_API_URL=http://localhost:3333/api

# 27. Fluxo completo da aplicação

O fluxo principal pode ser resumido da seguinte forma:

# 28. Decisões técnicas

Algumas decisões foram tomadas buscando equilíbrio entre simplicidade e boas práticas.

### Express separado do Next.js

A API foi mantida separada do frontend para facilitar:

- Organização
- Evolução independente
- Testes da API
- Reutilização futura do backend
- Separação entre apresentação e regra de negócio

### Prisma

Foi utilizado como ORM para evitar SQL manual nas operações do sistema e facilitar a manutenção do acesso ao banco.

### Zod

Foi escolhido para manter a validação próxima dos controllers e garantir que dados externos sejam verificados antes de chegar às regras de negócio.

### JWT

Foi escolhido para autenticação stateless entre frontend e API.

### bcrypt

Foi utilizado especificamente para armazenamento seguro das senhas através de hash.

### Optimistic UI

Foi utilizado no status das tarefas porque é uma interação simples e frequente, na qual a resposta visual imediata melhora a experiência sem comprometer a consistência, já que existe rollback em caso de falha.

# 29. Segurança implementada

A aplicação possui as seguintes medidas:

- Autenticação através de JWT.
- Senhas armazenadas utilizando bcrypt.
- JWT protegido por segredo em variável de ambiente.
- Rotas de tarefas protegidas.
- Isolamento de tarefas por usuário.
- Validação de payloads com Zod.
- Limitação de tamanho dos campos.
- Rejeição de propriedades não previstas através de `.strict()`.
- Prisma para acesso ao banco.
- Ausência de SQL concatenado nas operações implementadas.
- Ausência de `dangerouslySetInnerHTML`.
- React realizando escaping de conteúdo ual.
- Mensagens de erro internas não são expostas diretamente ao cliente.
- Variáveis sensíveis mantidas fora do código-fonte.

# 30. Validação do projeto

Durante o desenvolvimento foram realizados testes funcionais e de segurança.

Foram validados:

### Autenticação

- Cadastro
- Login
- Senha incorreta
- Email inválido
- Token válido
- Token inválido
- Ausência de token

### CRUD

- Criar tarefa
- Listar tarefas
- Buscar tarefa
- Atualizar tarefa
- Alterar status
- Excluir tarefa

### Isolamento

Foi validado que um usuário não consegue acessar, alterar ou remover tarefas pertencentes a outro usuário.

### Frontend

Também foram validados:

- Login
- Redirecionamento para dashboard
- Logout
- Criação
- Edição
- Exclusão
- Busca
- Filtros
- Ordenação
- Filtro por datas
- Status das tarefas
- Feedback visual
- Atualização otimista

### Build

O frontend foi validado através do build de produção do Next.js.

O backend também foi submetido ao build TypeScript após as alterações de segurança.

Ambos finalizaram sem erros.

# 31. Como executar o projeto

## Backend

### Local

todolist/backend

Instalar dependências:

bash
npm install

Executar em desenvolvimento:

bash
npm run dev

O backend é executado na porta:

3333

A API fica disponível em:

http://localhost:3333/api

## Frontend

### Local

todolist

Instalar dependências:

bash
npm install

Executar:

bash
npm run dev

O frontend será disponibilizado pelo Next.js.

A URL da API deve estar configurada em:

.env.local

Exemplo:

env
NEXT_PUBLIC_API_URL=http://localhost:3333/api

# 32. Build de produção

Frontend:

### Local

todolist

bash
npm run build

Backend:

### Local

todolist/backend

bash
npm run build

O build foi utilizado como uma das validações finais para garantir que o código TypeScript e a aplicação estejam consistentes antes da entrega.

# 33. Considerações finais

O projeto foi estruturado buscando manter uma arquitetura relativamente simples, mas com separação clara entre interface, API, regras de negócio e persistência.

A implementação cobre o fluxo completo de uma aplicação autenticada:

Cadastro
↓
Login
↓
JWT
↓
Dashboard
↓
CRUD de tarefas
↓
Filtros / Busca / Ordenação
↓
Persistência PostgreSQL

Do ponto de vista de engenharia, as principais preocupações durante a implementação foram:

- Separação de responsabilidades.
- Segurança de acesso aos dados.
- Validação de entrada.
- Integridade entre frontend e backend.
- Experiência de uso.
- Tratamento de erros.
- Manutenção do código.
- Uso de ferramentas atuais do ecossistema TypeScript/React.
- Evitar complexidade desnecessária.

O resultado é uma aplicação full-stack funcional, com autenticação, persistência em PostgreSQL, API REST, controle de acesso por usuário, CRUD completo e uma camada de frontend integrada ao backend.
