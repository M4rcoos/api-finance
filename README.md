# 🧾 API Finance - Sistema de Gestão Multi-Estabelecimentos

Sistema web de **gestão financeira e operacional** para pequenos negócios (lava-rápido, salão de beleza, oficina, etc). A plataforma permite que **cada proprietário ("owner") gerencie seus próprios serviços, atendimentos, receitas e despesas**, de forma segura, organizada e com relatórios completos.

---

## 🚀 Tecnologias Utilizadas

- **Backend:** [NestJS](https://nestjs.com/)
- **ORM:** [Prisma](https://www.prisma.io/) (com MySQL)
- **Banco de Dados:** MySQL
- **Autenticação:** JWT (JSON Web Token)
- **Criptografia:** Bcrypt
- **Documentação:** Swagger
- **Frontend:** React + Tailwind CSS

---

## 📦 Instalação do Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/M4rcoos/api-finance.git
cd api-finance
```
### 2. Instale as dependências
```bash
npm install
```
### 3. Configure o banco com Docker
```bash
docker-compose up -d
```

### 4. Execute a aplicação
```bash
npm run start:dev
```

### A API estará disponível em:
http://localhost:3000

## 📘 Documentação Swagger
Acesse a documentação da API em:

http://localhost:3000/api/docs
Inclui rotas de autenticação, serviços, despesas, atendimentos e relatórios.

##💡 Ideia do Projeto
Sistema multi-tenant voltado para pequenos negócios. Cada proprietário (owner) tem seu próprio ambiente para gerenciar:

Serviços personalizados

Registros de atendimentos

Receitas e despesas

Relatórios financeiros com filtros e gráficos

## 🧩 Funcionalidades
✅ Cadastro e Login (JWT)
Criação de contas de estabelecimentos

Login com autenticação segura (senha criptografada)

✅ Serviços
Cadastrar / Editar / Deletar serviços

Ativar ou inativar serviços

✅ Atendimentos
Registro completo do atendimento:

Cliente

Serviço

Valor

Forma de pagamento

✅ Controle Financeiro
Registro de despesas operacionais

Relatórios:

Diário, mensal e anual

Lucro líquido

Comparativos de receita x despesa

## 🗄️ Estrutura do Banco de Dados (MySQL)
owners
id, nome, email (único), senha, telefone

servicos
id, descrição, valor, status, owner_id

lancamentos (atendimentos)
id, cliente_id, servico_id, valor, forma_pagamento, data, owner_id

despesas
id, descrição, valor, data, owner_id

clientes
id, nome

## 🔗 Relacionamentos
Owner possui muitos Serviços, Atendimentos e Despesas

Serviços pertencem a um único Owner

Atendimentos vinculam clientes e serviços de um Owner

## 📊 Relatórios e Gráficos
Lucro líquido por período

Total de despesas

Comparação visual entre receitas e despesas

Filtros por dia, mês ou ano

## 🔐 Segurança
Senhas criptografadas com Bcrypt

Autenticação JWT

Separação de dados por estabelecimento (multi-tenant)

## 🌟 Diferenciais
Multi-Owner: múltiplos estabelecimentos isolados

Gestão financeira detalhada

Serviços personalizados por estabelecimento

Relatórios gráficos e filtros por período

API documentada com Swagger

## 📈 Futuras Implementações
Login com Google (OAuth2)

Dashboard com estatísticas em tempo real

Exportação de relatórios (PDF / Excel)

Multiusuários por estabelecimento (funcionários)

