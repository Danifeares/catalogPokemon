create database catalogo_pokemons;

create table usuarios (
  id serial primary key,
  nome varchar(255) not null,
  email varchar(255) unique not null,
  senha varchar(255) not null);

create table pokemons(
  id serial primary key,
  usuario_id integer references usuarios(id),
  nome varchar(255) not null,
  habilidades varchar(255) not null,
  imagem varchar(500),
  apelido varchar(255));