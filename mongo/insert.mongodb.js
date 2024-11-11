/* global use, db */
use("MarketPlaceDBEV");

//2. Inserção e Validação:

/**
db.usuario.insertMany([
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c0e1"),
    nome: "Carlos Santos",
    email: "carlos@example.com",
    senha: "senha123",
    endereco: {
      logradouro: "Rua Principal",
      numero: "123",
      bairro: "Centro",
      cidade: "Salvador",
      estado: "BA",
      cep: "40000-000",
      pais: "Brasil",
    },
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c0e2"),
    nome: "Maria Silva",
    email: "maria@example.com",
    senha: "senha123",
    endereco: {
      logradouro: "Rua Secundária",
      numero: "456",
      bairro: "idade Nova",
      cidade: "Feira de Santana",
      estado: "BA",
      cep: "40000-001",
      pais: "Brasil",
    },
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c0e3"),
    nome: "João Souza",
    email: "joao@example.com",
    senha: "senha123",
    endereco: {
      logradouro: "Rua Terceira",
      numero: "789",
      bairro: "Bela Vista",
      cidade: "Vitória da Conquista",
      estado: "BA",
      cep: "40000-002",
      pais: "Brasil",
    },
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c0e4"), // vendedor
    nome: "Ana Costa",
    email: "ana@example.com",
    senha: "senha123",
    endereco: {
      logradouro: "Rua Quarta",
      numero: "101",
      bairro: "Boa Vista",
      cidade: "Ilhéus",
      estado: "BA",
      cep: "40000-003",
      pais: "Brasil",
    },
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c0e5"), // vendedor
    nome: "Pedro Lima",
    email: "pedro@example.com",
    senha: "senha123",
    endereco: {
      logradouro: "Rua Quinta",
      numero: "202",
      bairro: "Horizonte",
      cidade: "Lauro de Freitas",
      estado: "BA",
      cep: "40000-004",
      pais: "Brasil",
    },
  },
]);

db.categoria.insertMany([
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c0c1"),
    nome: "Eletrônicos",
    subcategorias: [
      { _id: ObjectId("6485e5f9c4d60d43e7b9d0c1"), nome: "Smartphones" },
    ],
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c0c2"),
    nome: "Roupas",
    subcategorias: [
      { _id: ObjectId("6485e5f9c4d60d43e7b9d0c2"), nome: "Camisetas" },
    ],
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c0c3"),
    nome: "Livros",
    subcategorias: [
      { _id: ObjectId("6485e5f9c4d60d43e7b9d0c3"), nome: "Ficção científica" },
    ],
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c0c4"),
    nome: "Móveis",
    subcategorias: [
      { _id: ObjectId("6485e5f9c4d60d43e7b9d0c4"), nome: "Cozinha" },
    ],
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c0c5"),
    nome: "Brinquedos",
    subcategorias: [
      { _id: ObjectId("6485e5f9c4d60d43e7b9d0c5"), nome: "Boneca" },
    ],
  },
]);

db.produto.insertMany([
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c1a1"),
    nome: "Celular X",
    descricao: "Celular com 128GB de memória",
    preco: Double(1500.0),
    quantidade: 20,
    categoria: {
      nome: "Smartphones",
      cid: ObjectId("6485e5f9c4d60d43e7b9c0c1"),
    },    
    vendedor: ObjectId("6485e5f9c4d60d43e7b9c0e5"),
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c1a2"),
    nome: "Camiseta Y",
    descricao: "Camiseta de algodão",
    preco: Double(50.0),
    quantidade: 100,
    categoria: {
      nome: "Camisetas",
      cid: ObjectId("6485e5f9c4d60d43e7b9c0c2"),
    },    
    vendedor: ObjectId("6485e5f9c4d60d43e7b9c0e5"),
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c1a3"),
    nome: "Livro Z",
    descricao: "Livro de ficção científica",
    preco: Double(30.0),
    quantidade: 50,
    categoria: {
      nome: "Ficção científica",
      cid: ObjectId("6485e5f9c4d60d43e7b9c0c3"),
    },    
    vendedor: ObjectId("6485e5f9c4d60d43e7b9c0e5"),
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c1a4"),
    nome: "Mesa de Jantar",
    descricao: "Mesa de jantar para 6 pessoas",
    preco: Double(750.0),
    quantidade: 10,
    categoria: {
      nome: "Cozinha",
      cid: ObjectId("6485e5f9c4d60d43e7b9c0c4"),
    },    
    vendedor: ObjectId("6485e5f9c4d60d43e7b9c0e4"),
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c1a5"),
    nome: "Boneca Lili",
    descricao: "Boneca para crianças acima de 3 anos",
    preco: Double(45.0),
    quantidade: 30,
    categoria: {
      nome: "Bonecas",
      cid: ObjectId("6485e5f9c4d60d43e7b9c0c5"),
    },    
    vendedor: ObjectId("6485e5f9c4d60d43e7b9c0e4"),
  },
]);

db.transacao.insertMany([
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c2a1"),
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e1"),
    produtos: [
      {
        produto: ObjectId("6485e5f9c4d60d43e7b9c1a1"),
        quantidade: 1,
        preco: Double(1500.0),
        total: Double(1500.0),
      },
    ],
    data: new Date(),
    status: "pago",
    valor_total: Double(1500.0),
    quantidade_total: 1,
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c2a2"),
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e2"),
    produtos: [
      {
        produto: ObjectId("6485e5f9c4d60d43e7b9c1a2"),
        quantidade: 2,
        preco: Double(50.0),
        total: Double(100.0),
      },
    ],
    data: new Date(),
    status: "pendente",
    valor_total: Double(100.0),
    quantidade_total: 2,
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c2a3"),
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e3"),
    produtos: [
      {
        produto: ObjectId("6485e5f9c4d60d43e7b9c1a3"),
        quantidade: 3,
        preco: Double(30.0),
        total: Double(90.0),
      },
    ],
    data: new Date(),
    status: "entregue",
    valor_total: Double(90.0),
    quantidade_total: 3,
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c2a4"),
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e4"),
    produtos: [
      {
        produto: ObjectId("6485e5f9c4d60d43e7b9c1a4"),
        quantidade: 1,
        preco: Double(750.0),
        total: Double(750.0),
      },
    ],
    data: new Date(),
    status: "cancelado",
    valor_total: Double(750.0),
    quantidade_total: 1,
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c2a5"),
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e5"),
    produtos: [
      {
        produto: ObjectId("6485e5f9c4d60d43e7b9c1a5"),
        quantidade: 4,
        preco: Double(45.0),
        total: Double(180.0),
      },
    ],
    data: new Date(),
    status: "pago",
    valor_total: Double(180.0),
    quantidade_total: 4,
  },
]);

db.avaliacao.insertMany([
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c3a1"),
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e1"),
    produto: ObjectId("6485e5f9c4d60d43e7b9c1a1"),
    transacao: ObjectId("6485e5f9c4d60d43e7b9c2a1"),
    nota: 5,
    comentario: "Produto excelente, chegou rápido!",
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c3a2"),
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e2"),
    produto: ObjectId("6485e5f9c4d60d43e7b9c1a2"),
    transacao: ObjectId("6485e5f9c4d60d43e7b9c2a2"),
    nota: 4,
    comentario: "Boa qualidade, mas demorou um pouco.",
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c3a3"),
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e3"),
    produto: ObjectId("6485e5f9c4d60d43e7b9c1a3"),
    transacao: ObjectId("6485e5f9c4d60d43e7b9c2a3"),
    nota: 3,
    comentario: "Esperava mais do livro.",
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c3a4"),
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e4"),
    produto: ObjectId("6485e5f9c4d60d43e7b9c1a4"),
    transacao: ObjectId("6485e5f9c4d60d43e7b9c2a4"),
    nota: 2,
    comentario: "Mesa chegou danificada.",
  },
  {
    _id: ObjectId("6485e5f9c4d60d43e7b9c3a5"),
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e5"),
    produto: ObjectId("6485e5f9c4d60d43e7b9c1a5"),
    transacao: ObjectId("6485e5f9c4d60d43e7b9c2a5"),
    nota: 5,
    comentario: "Boneca ótima, minha filha adorou!",
  },
]);
 */
// Sprint 2

db.promocao.insertMany([
  {
    _id: ObjectId("6727d6f8f33a3f846ff0a192"),
    descontoPercentual: 20,
    dataInicio: ISODate("2024-11-01T00:00:00.000Z"),
    dataFim: ISODate("2024-11-15T23:59:59.000Z"),
    produto: ObjectId("6485e5f9c4d60d43e7b9c1a1"),
  },
  {
    _id: ObjectId("6727d6fbf33a3f846ff0a193"),
    descontoPercentual: 15,
    dataInicio: ISODate("2024-11-05T00:00:00.000Z"),
    dataFim: ISODate("2024-11-20T23:59:59.000Z"),
    produto: ObjectId("6485e5f9c4d60d43e7b9c1a2"),
  },
]);

db.pontuacao.insertMany([
  {
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e1"),
    pontos: 1500,
    operacoes: [
      {
        data: new Date(),
        operation: "credit",
        transacao: ObjectId("6485e5f9c4d60d43e7b9c2a1"),
        pontos: 1500,
      },
    ],
  },
  {
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e2"),
    pontos: 100,
    operacoes: [
      {
        data: new Date(),
        operation: "credit",
        transacao: ObjectId("6485e5f9c4d60d43e7b9c2a2"),
        pontos: 100,
      },
    ],
  },
  {
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e3"),
    pontos: 90,
    operacoes: [
      {
        data: new Date(),
        operation: "credit",
        transacao: ObjectId("6485e5f9c4d60d43e7b9c2a3"),
        pontos: 90,
      },
    ],
  },
  {
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e4"),
    pontos: 0,
    operacoes: [
      {
        data: new Date(),
        operation: "credit",
        transacao: ObjectId("6485e5f9c4d60d43e7b9c2a4"),
        pontos: 0,
      },
    ],
  },
  {
    usuario: ObjectId("6485e5f9c4d60d43e7b9c0e5"),
    pontos: 180,
    operacoes: [
      {
        data: new Date(),
        operation: "credit",
        transacao: ObjectId("6485e5f9c4d60d43e7b9c2a5"),
        pontos: 180,
      },
    ],
  },
]);

db.resposta_avaliacao.insertMany([
  {
    texto:
      "Agradecemos sua avaliação positiva! Ficamos muito felizes em saber que o celular atendeu suas expectativas.",
    vendedor: ObjectId("6485e5f9c4d60d43e7b9c0e5"), // Pedro Lima
    avaliacao: ObjectId("6485e5f9c4d60d43e7b9c3a1"),
    data: new Date(),
  },
  {
    texto:
      "Obrigado pelo feedback! Pedimos desculpas pela demora na entrega e estamos trabalhando para melhorar nosso prazo de entrega.",
    vendedor: ObjectId("6485e5f9c4d60d43e7b9c0e5"),
    avaliacao: ObjectId("6485e5f9c4d60d43e7b9c3a2"),
    data: new Date(),
  },
  {
    texto:
      "Lamentamos que o livro não tenha atendido completamente suas expectativas. Agradecemos seu feedback para podermos melhorar.",
    vendedor: ObjectId("6485e5f9c4d60d43e7b9c0e5"),
    avaliacao: ObjectId("6485e5f9c4d60d43e7b9c3a3"),
    data: new Date(),
  },
  {
    texto:
      "Pedimos sinceras desculpas pelo produto danificado. Já iniciamos o processo de devolução e reembolso integral.",
    vendedor: ObjectId("6485e5f9c4d60d43e7b9c0e4"),
    avaliacao: ObjectId("6485e5f9c4d60d43e7b9c3a4"),
    data: new Date(),
  },
  {
    texto:
      "Muito obrigado pela avaliação positiva! É gratificante saber que sua filha ficou feliz com a boneca.",
    vendedor: ObjectId("6485e5f9c4d60d43e7b9c0e4"),
    avaliacao: ObjectId("6485e5f9c4d60d43e7b9c3a5"),
    data: new Date(),
  },
]);
