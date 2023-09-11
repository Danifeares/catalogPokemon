![capa api](https://github.com/Danifeares/catalogPokemon/assets/117787402/a9d2b165-610a-455f-8464-8d28206645ce)

# API para catálogo de Pokémons

## Objetivo:
O projeto consiste em uma **API REST** que tem por objetivo ser um catálogo de pokémons. 📑 </br>
A aplicação realiza o cadastro dos usuários e salva as senhas com uso de criptografia. 🔐 </br>
Cada usuário logado por meio do token de autenticação pode cadastrar seus pokémons no banco de dados, listar todos (ou apenas um) ou deletar algum pokémon, quando bem entender.

---

## Funcionalidades: <a name="Índice"></a>
- [Cadastro de usuário - com senha criptografada](#cadastrarUsuário)
- [Login de usuário - é gerado token de autenticação, que será utilizado para acessar as demais funcionalidades](#loginUsuário)
- [Cadastro de pokémons](#cadastroPokemon)
- [Atualização de apelido de pokémon](#atualizaçãoPoke)
- [Listagem completa dos pokémons](#listarTodosPoke)
- [Listagem apenas de um pokémon pelo seu id](#listarUMPoke)
- [Exclusão de pokémon](#deletarPoke)
  
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

## Exemplos de utilização:


### Cadastrar usuário: <a name="cadastrarUsuário"></a>

✔️ Por meio da rota **post**: http://localhost:3000/user
    
- E-mail deve ser um campo único. 
- Verificar se todos os campos obrigatórios foram informados - nome, email e senha.
- Gerar id para o usuário cadastrado como chave primária e auto-incremento.

###### Exemplo de body da requisição:

```
{
"nome": "Francisca",
"email": "francisca1@gmail.com",
"senha": "umaSenhaSegura"
}
```

![CADASTRAR-USUÁRIO](https://github.com/Danifeares/catalogPokemon/assets/117787402/6c62dcad-3c47-4f80-bbd8-946400ff1fcf)

### [Voltar ao índice](#Índice)
---

### Login de usuário: <a name="loginUsuário"></a>

✔️ Por meio da rota **post**: http://localhost:3000/login
    
- Verificar se todos os campos obrigatórios foram informados e estão corretos - email e senha.
- É gerado token de autenticação a cada novo login. O token tem validade de 08 horas.

###### Exemplo de body da requisição:

```
{
"email": "francisca1@gmail.com",
"senha": "umaSenhaSegura"
}
```

![LOGIN-USUÁRIO](https://github.com/Danifeares/catalogPokemon/assets/117787402/6e619abb-3e22-490c-864a-e6be4c35c049)

### [Voltar ao índice](#Índice)
---

### Cadastro de pokémon: <a name="cadastroPokemon"></a>

✔️ Por meio da rota **post**: http://localhost:3000/pokemon
    
- Receber o _token_ do header da requisição (authorization) no formato _Bearer Token_ e validar o usuário logado.
- O campo _usuario_id_ não deve ser capturado do body da requisição. Deve ser obtido do token recebido no header.
- No cadastro de pokemon, o campo habilidades deverá receber apenas uma string de habilidades separadas por vírgulas.
- Gerar id para o pokemon cadastrado como chave primária e auto-incremento.
- Verificar se todos os campos obrigatórios foram passados - nome e habilidades.

###### Exemplo de body da requisição:

```
{
"nome": "Pikachu",
"apelido": "pikachu",
"habilidades": "static, lightning-rod",
"imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
}
```

![cadastrar-pokemon](https://github.com/Danifeares/catalogPokemon/assets/117787402/2851a192-607f-463f-82f7-a62e6405693d)

### [Voltar ao índice](#Índice)
---

### Atualização apenas do apelido do pokémon: <a name="atualizaçãoPoke"></a>

✔️ Por meio da rota **patch**: http://localhost:3000/nickname/:id
    
- Receber o _token_ do header da requisição (authorization) no formato _Bearer Token_ e validar o usuário logado.
- Verificar se todos os campos obrigatórios foram passados - apelido.
- Verificar se o pokémon que será acessado pertence ao usuário logado.

###### Exemplo de body da requisição:

```
{
"apelido": "squirtle"
}
```

![atualizar-apelido](https://github.com/Danifeares/catalogPokemon/assets/117787402/3b9ef29e-123a-47f8-aadc-b8b7bc487eba)

### [Voltar ao índice](#Índice)
---

### Listagem completa dos pokemons: <a name="listarTodosPoke"></a>

✔️ Por meio da rota **get**: http://localhost:3000/listingAll
    
- Receber o _token_ do header da requisição (authorization) no formato _Bearer Token_ e validar o usuário logado.
- Verificar se os pokémons que serão acessados pertencem ao usuário logado.

![listar-pokemons](https://github.com/Danifeares/catalogPokemon/assets/117787402/f0cdc8b0-13f0-45be-80a8-bc41d79499f0)

### [Voltar ao índice](#Índice)
---

### Listar apenas um pokémon pelo seu id:  <a name="listarUMPoke"></a>

✔️ Por meio da rota **get**: http://localhost:3000/pokemon/:id
    
- Receber o _token_ do header da requisição (authorization) no formato _Bearer Token_ e validar o usuário logado.
- Verificar se o pokémon que será acessado pertence ao usuário logado.

![listar-um-pokemon-só](https://github.com/Danifeares/catalogPokemon/assets/117787402/f0e87816-bbfe-4f93-8788-ab5664c31967)

### [Voltar ao índice](#Índice)
---

### Deletar um pokémon: <a name="deletarPoke"></a>

✔️ Por meio da rota **delete**: http://localhost:3000/pokemon/:id
    
- Receber o _token_ do header da requisição (authorization) no formato _Bearer Token_ e validar o usuário logado.
- Verificar se o pokémon que será acessado pertence ao usuário logado.

![deletar-pokemon](https://github.com/Danifeares/catalogPokemon/assets/117787402/a4ece935-feca-46a8-be1b-1e032ab0c5ab)

### [Voltar ao índice](#Índice)
---

###### tags: `criptografia` `lógica` `banco de dados` `sql` `postgres` `javascript` `REST` `CRUD`
