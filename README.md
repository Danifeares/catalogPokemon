![capa api](https://github.com/Danifeares/catalogPokemon/assets/117787402/a9d2b165-610a-455f-8464-8d28206645ce)

# API para catálogo de Pokémons

## Objetivo:
O projeto consiste em uma **API REST** que tem por objetivo ser um catálogo de pokémons. </br>
A aplicação realiza o cadastro dos usuários e salva as senhas com uso de criptografia. </br>
Cada usuário logado por meio do token de autenticação pode cadastrar seus pokémons no banco de dados, listar todos (ou apenas um) ou deletar algum pokémon, quando bem entender.

---

## Funcionalidades:
- Cadastro de usuário - com senha criptografada.
- Login de usuário - é gerado token de autenticação, que será utilizado para acessar as demais funcionalidades.
- Cadastro de pokémons.
- Atualização de apelido de pokémon.
- Listagem completa dos pokémons.
- Listagem apenas de um pokémon pelo seu id.
- Exclusão de pokémon.
  
---

## Como rodar o projeto? 

###### Requisitos: `NodeJS` `VScode` `Postgres` `Insomnia` 

- Faça o clone do projeto para sua máquina.
- Abra a pasta no seu editor de código de preferência (ex: VScode).
- Abra o terminal dentro da pasta do projeto (localize na barra superior o comando **new terminal**, ou digite **ctrl/comand + '**).
- Passe o comando **npm install** no terminal, para instalar a pasta **node_modules** com as bibliotecas necessárias para o programa funcionar.
- Para iniciar o servidor, digite **npm run dev** no terminal. Você pode derrubar o servidor a qualquer momento dando um **ctrl + c**, ou **comand + c**.
- Os testes apresentados logo abaixo foram realizados por meio da plataforma **Insomnia**, mas é possível rodar por meio de outras plataformas ou do seu navegador também.
- O acesso ao banco de dados _Postgres_ foi feito por meio da plataforma **Beekeeper Studio**, seguindo a seguinte configuração de conexão:
```
  const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123456',
  database: 'catalogo_pokemons'
  })
```
- O banco de dados se chama **catalogo_pokemons**, e o código SQL para criação das tabelas está dentro do arquivo **dump.sql**.

---

## Exemplo de utilização:






###### tags: `criptografia` `lógica` `banco de dados` `sql` `postgres` `javascript` `REST` `CRUD`
