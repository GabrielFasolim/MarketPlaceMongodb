/* global use, db */
use("MarketPlaceDBEV");

// db.usuario.insertMany([
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c0e1"),
//     nome: "Carlos Santos",
//     email: "carlos@example.com",
//     senha: "senha123",
//     endereco: {
//       logradouro: "Rua Principal",
//       numero: "123",
//       bairro: "Centro",
//       cidade: "Salvador",
//       estado: "BA",
//       cep: "40000-000",
//       pais: "Brasil",
//     },
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c0e2"),
//     nome: "Maria Silva",
//     email: "maria@example.com",
//     senha: "senha123",
//     endereco: {
//       logradouro: "Rua Secundária",
//       numero: "456",
//       bairro: "idade Nova",
//       cidade: "Feira de Santana",
//       estado: "BA",
//       cep: "40000-001",
//       pais: "Brasil",
//     },
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c0e3"),
//     nome: "João Souza",
//     email: "joao@example.com",
//     senha: "senha123",
//     endereco: {
//       logradouro: "Rua Terceira",
//       numero: "789",
//       bairro: "Bela Vista",
//       cidade: "Vitória da Conquista",
//       estado: "BA",
//       cep: "40000-002",
//       pais: "Brasil",
//     },
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c0e4"),
//     nome: "Ana Costa",
//     email: "ana@example.com",
//     senha: "senha123",
//     endereco: {
//       logradouro: "Rua Quarta",
//       numero: "101",
//       bairro: "Boa Vista",
//       cidade: "Ilhéus",
//       estado: "BA",
//       cep: "40000-003",
//       pais: "Brasil",
//     },
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c0e5"),
//     nome: "Pedro Lima",
//     email: "pedro@example.com",
//     senha: "senha123",
//     endereco: {
//       logradouro: "Rua Quinta",
//       numero: "202",
//       bairro: "Horizonte",
//       cidade: "Lauro de Freitas",
//       estado: "BA",
//       cep: "40000-004",
//       pais: "Brasil",
//     },
//   },
// ]);

// db.categoria.insertMany([
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c0c1"),
//     nome: "Eletrônicos",
//     subcategorias: [
//       { _id: ObjectId("6485e5f9c4d60d43e7b9d0c1"), nome: "Smartphones" },
//     ],
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c0c2"),
//     nome: "Roupas",
//     subcategorias: [
//       { _id: ObjectId("6485e5f9c4d60d43e7b9d0c2"), nome: "Camisetas" },
//     ],
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c0c3"),
//     nome: "Livros",
//     subcategorias: [
//       { _id: ObjectId("6485e5f9c4d60d43e7b9d0c3"), nome: "Ficção científica" },
//     ],
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c0c4"),
//     nome: "Móveis",
//     subcategorias: [
//       { _id: ObjectId("6485e5f9c4d60d43e7b9d0c4"), nome: "Cozinha" },
//     ],
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c0c5"),
//     nome: "Brinquedos",
//     subcategorias: [
//       { _id: ObjectId("6485e5f9c4d60d43e7b9d0c5"), nome: "Boneca" },
//     ],
//   },
// ]);

db.produto.insertMany([
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c099"),
    nome: "Celular X",
    descricao: "Celular com 128GB de memória",
    preco: 1500.0,
    quantidade: 20,
    categoria: {
      cid: ObjectId("6485e5f9c4d60d43e7b9c0c1"),
      nome: "Smartphones",
    },
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c000"),
    nome: "Camiseta Y",
    descricao: "Camiseta de algodão",
    preco: 50.0,
    quantidade: 100,
    categoria: {
      cid: ObjectId("6485e5f9c4d60d43e7b9c0c2"),
      nome: "Camisetas",
    },
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c011"),
    nome: "Livro Z",
    descricao: "Livro de ficção científica",
    preco: 30.0,
    quantidade: 50,
    categoria: {
      cid: ObjectId("6485e5f9c4d60d43e7b9c0c3"),
      nome: "Ficção científica",
    },
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c022"),
    nome: "Mesa de Jantar",
    descricao: "Mesa de jantar para 6 pessoas",
    preco: 750.0,
    quantidade: 10,
    categoria: {
      cid: ObjectId("6485e5f9c4d60d43e7b9c0c4"),
      nome: "Cozinha",
    },
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c033"),
    nome: "Boneca Lili",
    descricao: "Boneca para crianças acima de 3 anos",
    preco: 45.0,
    quantidade: 30,
    categoria: {
      cid: ObjectId("6485e5f9c4d60d43e7b9c0c5"),
      nome: "Bonecas",
    },
  },
]);

// db.transacao.insertMany([
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c2a1"),
//     usuario: ObjectId("6485e5f9c4d60d43e7b9c0e1"),
//     produtos: [
//       {
//         produto: ObjectId("6485e5f9c4d60d43e7b9c1a1"),
//         quantcidade: 1,
//         preco: 1500.0,
//         total: 1500.0,
//       },
//     ],
//     data: new Date(),
//     status: "pago",
//     valor_total: 1500.0,
//     quantidade_total: 1,
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c2a2"),
//     usuario: ObjectId("6485e5f9c4d60d43e7b9c0e2"),
//     produtos: [
//       {
//         produto: ObjectId("6485e5f9c4d60d43e7b9c1a2"),
//         quantcidade: 2,
//         preco: 50.0,
//         total: 100.0,
//       },
//     ],
//     data: new Date(),
//     status: "pendente",
//     valor_total: 100.0,
//     quantidade_total: 2,
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c2a3"),
//     usuario: ObjectId("6485e5f9c4d60d43e7b9c0e3"),
//     produtos: [
//       {
//         produto: ObjectId("6485e5f9c4d60d43e7b9c1a3"),
//         quantcidade: 3,
//         preco: 30.0,
//         total: 90.0,
//       },
//     ],
//     data: new Date(),
//     status: "entregue",
//     valor_total: 90.0,
//     quantidade_total: 3,
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c2a4"),
//     usuario: ObjectId("6485e5f9c4d60d43e7b9c0e4"),
//     produtos: [
//       {
//         produto: ObjectId("6485e5f9c4d60d43e7b9c1a4"),
//         quantcidade: 1,
//         preco: 750.0,
//         total: 750.0,
//       },
//     ],
//     data: new Date(),
//     status: "cancelado",
//     valor_total: 750.0,
//     quantidade_total: 1,
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c2a5"),
//     usuario: ObjectId("6485e5f9c4d60d43e7b9c0e5"),
//     produtos: [
//       {
//         produto: ObjectId("6485e5f9c4d60d43e7b9c1a5"),
//         quantcidade: 4,
//         preco: 45.0,
//         total: 180.0,
//       },
//     ],
//     data: new Date(),
//     status: "pago",
//     valor_total: 180.0,
//     quantidade_total: 4,
//   },
// ]);

// db.avaliacao.insertMany([
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c3a1"),
//     usuario: ObjectId("6485e5f9c4d60d43e7b9c0e1"),
//     produto: ObjectId("6485e5f9c4d60d43e7b9c1a1"),
//     transacao: ObjectId("6485e5f9c4d60d43e7b9c2a1"),
//     nota: 5,
//     comentario: "Produto excelente, chegou rápido!",
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c3a2"),
//     usuario: ObjectId("6485e5f9c4d60d43e7b9c0e2"),
//     produto: ObjectId("6485e5f9c4d60d43e7b9c1a2"),
//     transacao: ObjectId("6485e5f9c4d60d43e7b9c2a2"),
//     nota: 4,
//     comentario: "Boa qualidade, mas demorou um pouco.",
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c3a3"),
//     usuario: ObjectId("6485e5f9c4d60d43e7b9c0e3"),
//     produto: ObjectId("6485e5f9c4d60d43e7b9c1a3"),
//     transacao: ObjectId("6485e5f9c4d60d43e7b9c2a3"),
//     nota: 3,
//     comentario: "Esperava mais do livro.",
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c3a4"),
//     usuario: ObjectId("6485e5f9c4d60d43e7b9c0e4"),
//     produto: ObjectId("6485e5f9c4d60d43e7b9c1a4"),
//     transacao: ObjectId("6485e5f9c4d60d43e7b9c2a4"),
//     nota: 2,
//     comentario: "Mesa chegou danificada.",
//   },
//   {
//     _id: ObjectId("6485e5f9c4d60d43e7b9c3a5"),
//     usuario: ObjectId("6485e5f9c4d60d43e7b9c0e5"),
//     produto: ObjectId("6485e5f9c4d60d43e7b9c1a5"),
//     transacao: ObjectId("6485e5f9c4d60d43e7b9c2a5"),
//     nota: 5,
//     comentario: "Boneca ótima, minha filha adorou!",
//   },
// ]);
