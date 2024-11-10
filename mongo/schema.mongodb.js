/* global use, db */
use("MarketPlaceDBEV");

db.createCollection("usuario", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nome", "email", "senha", "endereco"],
      properties: {
        nome: {
          bsonType: "string",
          description: "Deve ser uma string e é obrigatório.",
        },
        email: {
          bsonType: "string",
          description: "Deve ser uma string e é obrigatório.",
        },
        senha: {
          bsonType: "string",
          description: "Deve ser uma string e é obrigatório.",
        },
        endereco: {
          bsonType: "object",
          description: "Deve ser um objeto e é obrigatório.",
          required: [
            "logradouro",
            "numero",
            "bairro",
            "cidade",
            "estado",
            "cep",
            "pais",
          ],
          properties: {
            logradouro: {
              bsonType: "string",
              description: "Deve ser uma string e é obrigatório.",
            },
            numero: {
              bsonType: "string",
              description: "Deve ser uma string e é obrigatório.",
            },
            complemento: {
              bsonType: "string",
              description: "Deve ser uma string e é opcional.",
            },
            bairro: {
              bsonType: "string",
              description: "Deve ser uma string e é obrigatório.",
            },
            cidade: {
              bsonType: "string",
              description: "Deve ser uma string e é obrigatório.",
            },
            estado: {
              bsonType: "string",
              description: "Deve ser uma string e é obrigatório.",
            },
            cep: {
              bsonType: "string",
              description: "Deve ser uma string e é obrigatório.",
            },
            pais: {
              bsonType: "string",
              description: "Deve ser uma string e é obrigatório.",
            },
          },
        },
      },
    },
  },
});

db.createCollection("produto", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nome", "descricao", "preco", "quantidade", "categoria"],
      properties: {
        nome: {
          bsonType: "string",
          description: "Deve ser uma string e é obrigatório.",
        },
        descricao: {
          bsonType: "string",
          description: "Deve ser uma string e é obrigatório.",
        },
        preco: {
          bsonType: "double",
          description: "Deve ser um double e é obrigatório.",
        },
        quantidade: {
          bsonType: "int",
          minimum: 0,
          description: "Deve ser um inteiro e é obrigatório.",
        },
        categoria: {
          bsonType: "object",
          description: "Deve ser um object e é obrigatório.",
          required: ["nome", "cid"],
          properties: {
            nome: {
              bsonType: "string",
              minLength: 1,
              description: "Deve ser uma string e é obrigatório.",
            },
            cid: {
              bsonType: "objectId",
              description: "Deve ser um ObjectId e é obrigatório.",
            },
          },
        },
      },
    },
  },
});

db.createCollection("categoria", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nome"],
      properties: {
        nome: {
          bsonType: "string",
          description:
            "Deve ser uma string. É obrigatório e deve ter entre 1 e 100 caracteres.",
          minLength: 1,
          maxLength: 100,
        },
        subcategorias: {
          bsonType: "array",
          description:
            "Deve ser um array de object representando as subcategorias. Opcional.",
          items: {
            bsonType: "object",
            required: ["nome", "_id"],
            properties: {
              _id: {
                bsonType: "objectId",
                description: "Deve ser um ObjectId e é obrigatório.",
              },
              nome: {
                bsonType: "string",
                description:
                  "Deve ser uma string. É obrigatório e deve ter entre 1 e 100 caracteres.",
                minLength: 1,
                maxLength: 100,
              },
            },
            minLength: 1,
            maxLength: 100,
          },
        },
      },
    },
  },
});

db.createCollection("transacao", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "usuario",
        "produtos",
        "data",
        "status",
        "valor_total",
        "quantidade_total",
      ],
      properties: {
        usuario: {
          bsonType: "objectId",
          description: "Deve ser um ObjectId e é obrigatório.",
        },
        produtos: {
          bsonType: "array",
          description: "Deve ser um array e é obrigatório.",
          items: {
            bsonType: "object",
            required: ["produto", "quantidade", "preco", "total"],
            properties: {
              produto: {
                bsonType: "objectId",
                description: "Deve ser um objectId e é obrigatório.",
              },
              quantidade: {
                bsonType: "int",
                minimum: 1,
                description: "Deve ser um inteiro e é obrigatório.",
              },
              preco: {
                bsonType: "double",
                description: "Deve ser um double e é obrigatório.",
              },
              total: {
                bsonType: "double",
                description: "Deve ser um double e é obrigatório.",
              },
            },
          },
        },
        data: {
          bsonType: "date",
          description: "Deve ser uma data e é obrigatório.",
        },
        status: {
          bsonType: "string",
          description: "Deve ser uma string e é obrigatório.",
          enum: ["pendente", "pago", "entregue", "cancelado"],
        },
        valor_total: {
          bsonType: "double",
          description: "Deve ser um double e é obrigatório.",
        },
        quantidade_total: {
          bsonType: "int",
          minimum: 0,
          description: "Deve ser um inteiro e é obrigatório.",
        },
      },
    },
  },
});

db.createCollection("avaliacao", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["usuario", "produto", "transacao", "nota", "comentario"],
      properties: {
        usuario: {
          bsonType: "objectId",
          description: "Deve ser um objectId e é obrigatório.",
        },
        transacao: {
          bsonType: "objectId",
          description: "Deve ser um objectId e é obrigatório.",
        },
        produto: {
          bsonType: "objectId",
          description: "Deve ser um objectId e é obrigatório.",
        },
        nota: {
          bsonType: "int",
          description: "Deve ser um inteiro e é obrigatório.",
        },
        comentario: {
          bsonType: "string",
          minLength: 10,
          description: "Deve ser uma string e é obrigatório.",
        },
      },
    },
  },
});
