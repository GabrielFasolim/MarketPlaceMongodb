use("MarketPlaceDBEV");

// 1. Consulta para calcular o valor total de vendas e a quantidade de transações para cada vendedor.
db.transacao.aggregate([
    { $unwind: "$produtos" },
    {
        $group: {
            _id: "$produtos.vendedor",
            totalVendasPeriodo: { $sum: "$produtos.total" },
            quantidadeVendidaPeriodo: { $sum: "$produtos.quantidade" }
        }
    },
    {
        $lookup: {
            from: "usuario",              
            localField: "_id",             
            foreignField: "_id",          
            as: "vendedor"               
        }
    },
    { $unwind: { path: "$vendedor", preserveNullAndEmptyArrays: true } },  // Desfaz array, mantendo nulo se não existir
    {
        $project: {
            _id: 0,
            vendedor: "$vendedor.nome",     
            totalVendasPeriodo: 1,
            quantidadeVendidaPeriodo: 1
        }
    }
]).toArray();

// 2. Consulta para calcular o total de vendas e quantidade de produtos vendidos por cada vendedor em um determinado período.
db.transacao.aggregate([
    {
        $match: {
            data: {
                $gte: ISODate("2024-01-01"),
                $lte: ISODate("2024-12-31")
            }
        }
    },
    { $unwind: "$produtos" },
    {
        $group: {
            _id: "$produtos.vendedor",
            totalVendasPeriodo: { $sum: "$produtos.total" },
            quantidadeVendidaPeriodo: { $sum: "$produtos.quantidade" }
        }
    },
    {
        $lookup: {
            from: "usuario",
            localField: "_id",
            foreignField: "_id",
            as: "vendedor"
        }
    },
    { $unwind: { path: "$vendedor", preserveNullAndEmptyArrays: true } },
    {
        $project: {
            _id: 0,
            vendedor: "$vendedor.nome",
            totalVendasPeriodo: 1,
            quantidadeVendidaPeriodo: 1
        }
    }
]);


// 3. Consulta para calcular a média de preço dos produtos vendidos por cada vendedor.
db.transacao.aggregate([
    { $unwind: "$produtos" },
    {
        $group: {
            _id: "$produtos.vendedor",
            totalVendas: { $sum: "$produtos.total" },
            quantidadeVendida: { $sum: "$produtos.quantidade" },
            numeroTransacoes: { $sum: 1 }
        }
    },
    {
        $lookup: {
            from: "usuario",
            localField: "_id",
            foreignField: "_id",
            as: "vendedor"
        }
    },
    { $unwind: { path: "$vendedor", preserveNullAndEmptyArrays: true } },
    {
        $project: {
            _id: 0,
            vendedor: "$vendedor.nome",
            totalVendas: 1,
            quantidadeVendida: 1,
            numeroTransacoes: 1
        }
    }
]);

db.transacao.aggregate([
    { $unwind: "$produtos" },
    {
        $group: {
            _id: { vendedor: "$produtos.vendedor", produto: "$produtos.produto" },
            quantidadeVendida: { $sum: "$produtos.quantidade" }
        }
    },
    {
        $lookup: {
            from: "produto",
            localField: "_id.produto",
            foreignField: "_id",
            as: "produto"
        }
    },
    { $unwind: { path: "$produto", preserveNullAndEmptyArrays: true } },
    {
        $lookup: {
            from: "usuario",
            localField: "_id.vendedor",
            foreignField: "_id",
            as: "vendedor"
        }
    },
    { $unwind: { path: "$vendedor", preserveNullAndEmptyArrays: true } },
    {
        $project: {
            _id: 0,
            vendedor: "$vendedor.nome",
            produto: "$produto.nome",
            quantidadeVendida: 1
        }
    },
    { $sort: { quantidadeVendida: -1 } }
]);


db.transacao.aggregate([
    { $unwind: "$produtos" },
    {
        $group: {
            _id: { vendedor: "$usuario", produto: "$produtos.produto" },
            quantidadeVendida: { $sum: "$produtos.quantidade" },
            totalVendasProduto: { $sum: "$produtos.total" }
        }
    },
    {
        $lookup: {
            from: "produto",
            localField: "_id.produto",
            foreignField: "_id",
            as: "produto"
        }
    },
    { $unwind: "$produto" },
    {
        $lookup: {
            from: "usuario",
            localField: "_id.vendedor",
            foreignField: "_id",
            as: "vendedor"
        }
    },
    { $unwind: "$vendedor" },
    {
        $project: {
            _id: 0,
            vendedor: "$vendedor.nome",
            produto: "$produto.nome",
            quantidadeVendida: 1,
            totalVendasProduto: 1
        }
    },
    { $sort: { vendedor: 1, totalVendasProduto: -1 } }
]);