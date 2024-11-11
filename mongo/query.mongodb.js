/* global use, db */
use("MarketPlaceDBEV");

/**
// 3. Consultas:
// Escreva uma consulta para encontrar todos os produtos em uma categoria específica.
const produto = db.produto.findOne({ "categoria.nome": "Camisetas" });

console.log(produto);

// Escreva uma consulta para encontrar todas as avaliações de um produto específico.
const avaliacao = db.avaliacao.find({ produto: produto._id });

console.log(avaliacao.toArray());

// Escreva uma consulta para criar uma nova transação.
const usuario = db.usuario.findOne({ nome: /^Carlos/ }, { _id: 1, nome: 1 });

const produtos = db.produto
  .find({ quantidade: { $gt: 1 } }, { _id: 1, descricao: 1, preco: 1 })
  .limit(2)
  .toArray();

console.log(usuario, produtos);

const carrinho = produtos.map((produto) => ({
  produto: produto._id,
  quantidade: 1,
  preco: Double(produto.preco),
  total: Double(produto.preco * 1),
}));

db.transacao.insertOne({
  usuario: usuario._id,
  produtos: carrinho,
  data: new Date(),
  status: "pendente",
  valor_total: Double(carrinho.reduce((acc, curr) => acc + curr.total, 0)),
  quantidade_total: carrinho.reduce((acc, curr) => acc + curr.quantidade, 0),
});

// - Escreva uma consulta para atualizar a quantidade disponível de um produto após uma compra.
carrinho.forEach((item) =>
  db.produto.updateOne(
    { _id: item.produto },
    {
      $inc: { quantidade: -item.quantidade },
    }
  )
);
 */

/**
// 4 - Indices

// usuarios
db.usuarios.createIndex({ email: 1 }, { unique: true });

// categorias
db.categorias.createIndex({ nome: 1 });

// produtos
db.produtos.createIndex({ nome: 1 });
db.produtos.createIndex({ categoria: 1 });

// avaliacoes
db.avaliacoes.createIndex({ produto: 1 });
db.avaliacoes.createIndex({ usuario: 1 });

// transacoes
db.transacoes.createIndex({ produto: 1 });
db.transacoes.createIndex({ usuario: 1 });
 */

/**
// 5. Agregações:

//- Escreva uma consulta de agregação para encontrar a média de avaliações para cada produto.
db.avaliacao.aggregate([
  {
    $group: {
      _id: "$produto",
      media: { $avg: "$nota" },
    },
  },
]);

//- Escreva uma consulta de agregação para encontrar o total de vendas para cada categoria.
db.transacao.aggregate([
  {
    $unwind: "$produtos",
  },
  {
    $lookup: {
      from: "produto",
      localField: "produtos.produto",
      foreignField: "_id",
      as: "produto_info",
    },
  },
  {
    $unwind: "$produto_info",
  },
  {
    $group: {
      _id: "$produto_info.categoria.nome",
      totalVendas: {
        $sum: "$produtos.total",
      },
    },
  },
]);
 */

// Sprint 2

// const promocaoProduto = db.promocao
//   .aggregate([
//     {
//       $lookup: {
//         from: "produto",
//         localField: "produto",
//         foreignField: "_id",
//         as: "produtos",
//       },
//     },
//     {
//       $unwind: "$produtos",
//     },
//     {
//       $project: {
//         promocao: "$_id",
//         produto: "$produtos._id",
//         nome: "$produtos.nome",
//         preco: "$produtos.preco",
//         preco_promocional: {
//           $subtract: [
//             "$produtos.preco",
//             {
//               $divide: [
//                 { $multiply: ["$produtos.preco", "$descontoPercentual"] },
//                 100,
//               ],
//             },
//           ],
//         },
//       },
//     },
//   ])
//   .toArray();

// const usuario = db.usuario.findOne({ nome: /^Maria/ }, { _id: 1, nome: 1 });

// const carrinho = promocaoProduto.map((produto) => ({
//   produto: produto.produto,
//   quantidade: 1,
//   preco: Double(produto.preco_promocional),
//   total: Double(produto.preco_promocional * 1),
//   promocao: {
//     pid: produto.promocao,
//     precoOriginal: Double(produto.preco),
//     precoDesconto: Double(produto.preco_promocional),
//   },
// }));

// db.transacao.insertOne({
//   _id: ObjectId("6485e5f9c4d60d43e7b9c2a5"),
//   usuario: usuario._id,
//   produtos: carrinho,
//   data: new Date(),
//   status: "pendente",
//   valor_total: Double(carrinho.reduce((acc, curr) => acc + curr.total, 0)),
//   quantidade_total: carrinho.reduce((acc, curr) => acc + curr.quantidade, 0),
// });

// carrinho.forEach((item) =>
//   db.produto.updateOne(
//     { _id: item.produto },
//     {
//       $inc: { quantidade: -item.quantidade },
//     }
//   )
// );

// db.pontuacao.updateOne(
//   { usuario: usuario._id },
//   {
//     $inc: {
//       pontos: carrinho.reduce((acc, curr) => acc + curr.total, 0),
//     },
//     $push: {
//       operacoes: {
//         data: new Date(),
//         operation: "credit",
//         transacao: ObjectId("6485e5f9c4d60d43e7b9c2a5"),
//         pontos: carrinho.reduce((acc, curr) => acc + curr.total, 0),
//       },
//     },
//   },
//   { upsert: true }
// );

db.usuario.createIndex({ "endereco.localizacao": "2dsphere" });
db.produto.createIndex({ localizacao_vendedor: "2dsphere" });

// Atualizar localização dos vendedores
db.usuario.updateOne(
  { _id: ObjectId("6485e5f9c4d60d43e7b9c0e4") }, // Ana Costa
  {
    $set: {
      "endereco.localizacao": {
        type: "Point",
        coordinates: [-38.4713, -12.9777], // Coordenadas em Salvador
      },
    },
  }
);

db.usuario.updateOne(
  { _id: ObjectId("6485e5f9c4d60d43e7b9c0e5") }, // Pedro Lima
  {
    $set: {
      "endereco.localizacao": {
        type: "Point",
        coordinates: [-38.3213, -12.8877], // Coordenadas em Lauro de Freitas
      },
    },
  }
);

// Atualizar produtos com a localização dos vendedores
db.produto.updateMany(
  { vendedor: ObjectId("6485e5f9c4d60d43e7b9c0e4") },
  {
    $set: {
      localizacao_vendedor: {
        type: "Point",
        coordinates: [-38.4713, -12.9777],
      },
    },
  }
);

db.produto.updateMany(
  { vendedor: ObjectId("6485e5f9c4d60d43e7b9c0e5") },
  {
    $set: {
      localizacao_vendedor: {
        type: "Point",
        coordinates: [-38.3213, -12.8877],
      },
    },
  }
);

db.produto.find({
  localizacao_vendedor: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [-38.4713, -12.9777],
      },
      $maxDistance: 10 * 1000, // Converter km para metros
    },
  },
});

// Agregação para calcular média de distância em transações concluídas
db.transacao.aggregate([
  {
    $match: {
      status: "entregue",
    },
  },
  {
    $lookup: {
      from: "usuario",
      localField: "usuario",
      foreignField: "_id",
      as: "comprador",
    },
  },
  {
    $unwind: "$produtos",
  },
  {
    $lookup: {
      from: "produto",
      localField: "produtos.produto",
      foreignField: "_id",
      as: "produto_info",
    },
  },
  {
    $unwind: "$produto_info",
  },
  {
    $lookup: {
      from: "usuario",
      localField: "produto_info.vendedor",
      foreignField: "_id",
      as: "vendedor",
    },
  },
  {
    $unwind: "$comprador",
  },
  {
    $unwind: "$vendedor",
  },
  {
    $project: {
      distancia: {
        $divide: [
          {
            $geoDistance: {
              from: "$comprador.endereco.localizacao",
              to: "$vendedor.endereco.localizacao",
              spherical: true,
            },
          },
          1000,
        ], // Converter metros para quilômetros
      },
    },
  },
  {
    $group: {
      _id: null,
      distanciaMedia: { $avg: "$distancia" },
    },
  },
]);

db.transacao
  .aggregate([
    {
      $unwind: "$produtos",
    },
    {
      $lookup: {
        from: "produto",
        localField: "produtos.produto",
        foreignField: "_id",
        as: "produto_info",
      },
    },
    {
      $unwind: "$produto_info",
    },
    {
      $match: {
        "produto_info.localizacao_vendedor": {
          $geoWithin: {
            $centerSphere: [[-38.4713, -12.9777], 10 / 6371], // Raio em radianos
          },
        },
      },
    },
    {
      $group: {
        _id: "$produto_info.categoria.nome",
        total_vendas: { $sum: "$produtos.quantidade" },
        valor_total: { $sum: "$produtos.total" },
      },
    },
    {
      $sort: { total_vendas: -1 },
    },
  ])
  .toArray();
