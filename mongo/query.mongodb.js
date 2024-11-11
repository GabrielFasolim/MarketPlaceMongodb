/* global use, db */
use("MarketPlaceDBEV");

// 3. Consultas:
// Escreva uma consulta para encontrar todos os produtos em uma categoria específica.
const produto = db.produto.find({ "categoria.nome": "Camisetas" }).toArray();

console.log(produto);

// Escreva uma consulta para encontrar todas as avaliações de um produto específico.
const avaliacao = db.avaliacao.find({ produto: produto[0]._id });

console.log(avaliacao.toArray());

// Escreva uma consulta para criar uma nova transação.
const usuario = db.usuario.findOne({ nome: /^Carlos/ }, { _id: 1, nome: 1 });

const produtos = db.produto
  .find({ quantidade: { $gt: 1 } }, { _id: 1, descricao: 1, preco: 1 })
  .limit(2)
  .toArray();

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

// 5. Agregações:

//- Escreva uma consulta de agregação para encontrar a média de avaliações para cada produto.
console.log(
  db.avaliacao
    .aggregate([
      {
        $lookup: {
          from: "produto",
          localField: "produto",
          foreignField: "_id",
          as: "produto",
        },
      },
      {
        $unwind: "$produto",
      },
      {
        $group: {
          _id: "$produto._id",
          nome: { $first: "$produto.nome" },
          media: { $avg: "$nota" },
        },
      },
      {
        $project: {
          _id: 1,
          nome: 1,
          media: 1,
        },
      },
    ])
    .toArray()
);

//- Escreva uma consulta de agregação para encontrar o total de vendas para cada categoria.
console.log(
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
        $group: {
          _id: "$produto_info.categoria.nome",
          totalVendas: {
            $sum: "$produtos.total",
          },
        },
      },
      {
        $project: {
          _id: 0,
          categoria: "$_id",
          totalVendas: 1,
        },
      },
    ])
    .toArray()
);

// Sprint 2

const promocaoProduto = db.promocao
  .aggregate([
    {
      $lookup: {
        from: "produto",
        localField: "produto",
        foreignField: "_id",
        as: "produtos",
      },
    },
    {
      $unwind: "$produtos",
    },
    {
      $project: {
        promocao: "$_id",
        produto: "$produtos._id",
        nome: "$produtos.nome",
        preco: "$produtos.preco",
        preco_promocional: {
          $subtract: [
            "$produtos.preco",
            {
              $divide: [
                { $multiply: ["$produtos.preco", "$descontoPercentual"] },
                100,
              ],
            },
          ],
        },
      },
    },
  ])
  .toArray();

const usuario1 = db.usuario.findOne({ nome: /^Maria/ }, { _id: 1, nome: 1 });

const carrinho1 = promocaoProduto.map((produto) => ({
  produto: produto.produto,
  quantidade: 1,
  preco: Double(produto.preco_promocional),
  total: Double(produto.preco_promocional * 1),
  promocao: {
    pid: produto.promocao,
    precoOriginal: Double(produto.preco),
    precoDesconto: Double(produto.preco_promocional),
  },
}));

db.transacao.insertOne({
  _id: ObjectId("6485e5f9c4d60d43e7b9c2a5"),
  usuario: usuario1._id,
  produtos: carrinho1,
  data: new Date(),
  status: "pendente",
  valor_total: Double(carrinho.reduce((acc, curr) => acc + curr.total, 0)),
  quantidade_total: carrinho.reduce((acc, curr) => acc + curr.quantidade, 0),
});

carrinho1.forEach((item) =>
  db.produto.updateOne(
    { _id: item.produto },
    {
      $inc: { quantidade: -item.quantidade },
    }
  )
);

db.pontuacao.updateOne(
  { usuario: usuario1._id },
  {
    $inc: {
      pontos: carrinho1.reduce((acc, curr) => acc + curr.total, 0),
    },
    $push: {
      operacoes: {
        data: new Date(),
        operation: "credit",
        transacao: ObjectId("6485e5f9c4d60d43e7b9c2a5"),
        pontos: carrinho1.reduce((acc, curr) => acc + curr.total, 0),
      },
    },
  },
  { upsert: true }
);

db.produto.find({
  localizacao_vendedor: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [-38.3213, -12.8877],
      },
      $maxDistance: 10 * 1000, // Converter km para metros
    },
  },
});

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
        $sqrt: {
          $add: [
            {
              $pow: [
                {
                  $subtract: [
                    {
                      $arrayElemAt: [
                        "$comprador.endereco.localizacao.coordinates",
                        0,
                      ],
                    },
                    {
                      $arrayElemAt: [
                        "$vendedor.endereco.localizacao.coordinates",
                        0,
                      ],
                    },
                  ],
                },
                2,
              ],
            },
            {
              $pow: [
                {
                  $subtract: [
                    {
                      $arrayElemAt: [
                        "$comprador.endereco.localizacao.coordinates",
                        1,
                      ],
                    },
                    {
                      $arrayElemAt: [
                        "$vendedor.endereco.localizacao.coordinates",
                        1,
                      ],
                    },
                  ],
                },
                2,
              ],
            },
          ],
        },
      },
    },
  },
  {
    $group: {
      _id: 0,
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
