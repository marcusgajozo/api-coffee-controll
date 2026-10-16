# API Coffee Controll

API REST de assinaturas de café. Mantém planos e assinaturas de clientes e desativa sozinha as assinaturas vencidas.

Escrevi em 2023 para praticar Express com TypeScript e TypeORM num domínio com regra de tempo, em vez de mais um CRUD sem consequência.

## Stack

- Express 4 com TypeScript
- TypeORM 0.3 com PostgreSQL
- Validação de entrada com yup
- `helmet`, `morgan`, `cors` e `express-async-errors` na base HTTP
- `node-schedule` na rotina de expiração
- Documentação em `src/swagger.json`, servida pelo próprio projeto com `swagger-ui-express`

## Domínio

Duas entidades, em `src/app/entities/`:

**Plan** é o plano de assinatura, com nome, descrição e preço guardado em centavos (`price_in_cents`).

**Signature** é a assinatura de um cliente em um plano, com `durationMonths`, `active` e a data de criação. A data de vencimento não é gravada: ela é calculada somando `durationMonths` à data de criação, o que mantém uma única fonte de verdade para o prazo.

## Rotas

| Método | Rota                               | O que faz                                                       |
| ------ | ---------------------------------- | --------------------------------------------------------------- |
| GET    | `/plans`                           | lista os planos                                                 |
| GET    | `/plans/:id`                       | busca plano por id                                              |
| POST   | `/plans`                           | cria plano                                                      |
| PUT    | `/plans/:id`                       | atualiza plano                                                  |
| DELETE | `/plans/:id`                       | remove plano                                                    |
| GET    | `/signatures`                      | lista as assinaturas                                            |
| GET    | `/signatures/:id`                  | busca assinatura por id                                         |
| POST   | `/signatures`                      | cria assinatura vinculada a um plano                            |
| PUT    | `/signatures/:id`                  | atualiza assinatura                                             |
| PUT    | `/signatures/cancel/:id`           | cancela assinatura                                              |
| DELETE | `/signatures/:id`                  | remove assinatura                                               |
| GET    | `/desativar-assinaturas-expiradas` | varre as assinaturas ativas e desativa as que já venceram        |

## Como rodar

```bash
yarn install
cp .env.example .env      # ajuste host, usuário e senha do Postgres
yarn start:dev
```

A API sobe na porta indicada em `PORT`, ou em 3333 quando a variável não existe. O banco precisa estar criado, com o schema gerado a partir das entidades do TypeORM.

## Estado do projeto

Funcionando: CRUD de planos e assinaturas, cancelamento, validação de entrada com yup e a rotina que desativa assinaturas vencidas.

Faltando: testes automatizados (o script `test` é o padrão do npm), Dockerfile, pipeline de CI e paginação nas listagens, que hoje devolvem todos os registros.

## Licença

Sem licença definida.
