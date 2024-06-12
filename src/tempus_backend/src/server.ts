import { PrismaClient } from '@prisma/client';
import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import { z, ZodError } from 'zod';
import cors from '@fastify/cors';  // Importe o CORS
import { createHash } from 'crypto';

const app = fastify();
const prisma = new PrismaClient();
app.register(cors, {
    origin: (origin, callback) => {
        if (!origin || /localhost/.test(origin)) {
            // Permitir a origem da solicitação
            callback(null, true);
        } else {
            // Bloquear a solicitação, passando um erro no callback
            callback(new Error('Not allowed by CORS'), false);
        }
    }
});


const ProductSchema = z.object({
    name: z.string(),
    sku: z.string().optional(),
});

function toSHA256(input: string): string {
    return createHash('sha256').update(input).digest('hex');
}

let autoIncrementId = 0;

app.post('/produtos', async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const productData = ProductSchema.parse(req.body);

        let skuToUse: any = productData.sku;

        if (!skuToUse) {
            // Garantir que o encryptedId seja único
            let isUnique = false;
            let encryptedId;
            while (!isUnique) {
                autoIncrementId++;
                encryptedId = toSHA256(autoIncrementId.toString());

                const existingProduct = await prisma.produto.findUnique({
                    where: { sku: encryptedId },
                });

                if (!existingProduct) {
                    isUnique = true;
                    skuToUse = encryptedId;
                }
            }
        } else {
            // Verificar se o SKU fornecido já existe
            const existingProduct = await prisma.produto.findUnique({
                where: { sku: skuToUse },
            });

            if (existingProduct) {
                return res.code(400).send({ error: 'SKU already exists' });
            }
        }

        const product = await prisma.produto.create({
            data: {
                ...productData,
                sku: skuToUse,
            },
        });

        return res.code(201).send(product);
    } catch (error: any) {
        if (error instanceof ZodError) {
            return res.code(400).send(error.errors);
        }
        console.log(error);
        return res.code(500).send({ error: error.message });
    }
});

app.get('/produtos', async (req: FastifyRequest , res: FastifyReply) => {
    try {
        // Fetch all products from the database
        const products = await prisma.produto.findMany();

        return res.code(200).send(products);
    } catch (error: any) {
        console.log(error);
        return res.code(500).send({ error: error.message });
    }
});

const TransactionSchema = z.object({
    carteira1: z.string().min(1),
    carteira2: z.string().min(1),
    quantidade: z.number(),
    preco: z.number(),
    validado: z.boolean().optional(),
    productSku: z.string().min(1),
    timestamp: z.string() // Isso valida que o 'timestamp' é uma data
});

const TransactionsSchema = z.array(TransactionSchema);

// Endpoint para adicionar um lote de transações
app.post('/transacoes/batch', async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const transactionsData = TransactionsSchema.parse(req.body);
      
      const transactionsWithTimestamp = transactionsData.map(t => ({
        ...t,
        timestamp: new Date(t.timestamp), // Convert string to Date
        validado: t.validado ?? false, // Use o valor 'validado' se existir, caso contrário, defina como false
      }));
  
      const transactions = await prisma.$transaction(
        transactionsWithTimestamp.map(t => 
          prisma.transacao.create({
            data: t,
          })
        )
      );
  
      return res.code(201).send(transactions);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.code(400).send(error.errors);
      }
      console.log(error);
      return res.code(500).send({ error: error.message });
    }
  });

// Endpoint para buscar todas as transações
app.get('/transacoes', async (req: FastifyRequest , res: FastifyReply) => {
    try {
        const transactions = await prisma.transacao.findMany({
            include: { produto: true }  // Inclui os dados do produto relacionado
        });
        return res.code(200).send(transactions);
    } catch (error: any) {
        console.log(error);
        return res.code(500).send({ error: error.message });
    }
});

// Defina uma interface para os parâmetros esperados
interface Params {
    sku: string;
}


// No contexto do seu endpoint
app.get('/transacoes/:sku', async (req: FastifyRequest<{Params: Params}> , res: FastifyReply) => {
    try {
        // Agora o TypeScript sabe que `sku` é uma string
        const { sku } = req.params;

        // Buscar transações correspondentes ao SKU fornecido
        const transactions = await prisma.transacao.findMany({
            where: {
                productSku: sku,
            },
            include: { produto: true }  // Inclui os dados do produto relacionado
        });

        return res.code(200).send(transactions);
    } catch (error: any) {
        console.log(error);
        return res.code(500).send({ error: error.message });
    }
});

// Endpoint para adicionar transações
app.post('/transacoes', async (req: FastifyRequest , res: FastifyReply) => {
  try {
    const transactionData = TransactionSchema.parse(req.body);

    // Converta strings para BigInt e String para Date antes de passar para o Prisma
    const dataForPrisma = {
      ...transactionData,
      quantidade: Number(transactionData.quantidade),
      preco: Number(transactionData.preco),
      timestamp: new Date(transactionData.timestamp), // Convert string to Date
      validado: false, // Defina um valor padrão, se necessário
    };

    const transaction = await prisma.transacao.create({
      data: dataForPrisma,
    });

    return res.code(201).send(transaction);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.code(400).send(error.errors);
    }
    console.log(error);
    return res.code(500).send({ error: error.message });
  }
});

// Definindo o esquema Zod para validar o parâmetro da query
const WalletSchema = z.object({
    wallet: z.string(),
  });
  
// Endpoint para buscar transações por carteira
app.get('/transacoes/wallet', async (req: FastifyRequest<{ Querystring: { wallet: string } }>, res: FastifyReply) => {
    try {
        // Validar a querystring
        const query = WalletSchema.parse(req.query);

        const transactions = await prisma.transacao.findMany({
            where: {
                OR: [
                    { carteira1: { equals: query.wallet, mode: 'insensitive' } },
                    { carteira2: { equals: query.wallet, mode: 'insensitive' } }
                ],
                validado: true,
            },
            include: { produto: true }  // Inclui os dados do produto relacionado
        });

        return res.code(200).send(transactions);
    } catch (error: any) {
        if (error instanceof ZodError) {
            return res.code(400).send(error.errors);
        }
        console.log(error);
        return res.code(500).send({ error: error.message });
    }
});

// Definindo o esquema Zod para validar o parâmetro
const WalletParamSchema = z.object({
    carteira2: z.string(),
  });
  
  app.get('/transacoes/validar/:carteira2', async (req: FastifyRequest<{ Params: { carteira2: string } }>, res: FastifyReply) => {
    try {
        const params = WalletParamSchema.parse(req.params);

        const transactions = await prisma.transacao.findMany({
            where: {
                carteira2: {
                    equals: params.carteira2,
                    mode: 'insensitive'
                },
                validado: false,
            },
            include: { produto: true }
        });

        // Converta BigInt para String (se aplicável)
        const modifiedTransactions = transactions.map(transaction => ({
            ...transaction,
            quantidade: transaction.quantidade.toString(),
            preco: transaction.preco.toString(),
            // Adicione outras conversões aqui se outros campos forem BigInt
        }));

        console.log(modifiedTransactions);
        
        return res.code(200).send(modifiedTransactions);
    } catch (error: any) {
        console.error(error);
        if (error instanceof ZodError) {
            return res.code(400).send(error.errors);
        }
        return res.code(500).send({ error: error.message });
    }
});
// Esquema Zod para validar os parâmetros da requisição
const UpdateValidationSchema = z.object({
    id: z.string(),
});
  
// Endpoint para atualizar o estado 'validado' de uma transação
app.put('/transacoes/:id', async (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
    try {
        // Validar o parâmetro e o corpo da requisição
        const validatedData = UpdateValidationSchema.parse({
            id: req.params.id,
        });

        const updatedTransaction = await prisma.transacao.update({
            where: {
                id: Number(validatedData.id),
            },
            data: {
                validado: true,
            },
        });

        return res.code(200).send(updatedTransaction);
    } catch (error: any) {
        if (error instanceof ZodError) {
            return res.code(400).send(error.errors);
        }
        console.log(error);
        return res.code(500).send({ error: error.message });
    }
});

// Esquema Zod para validar os dados do cliente na criação
const ClienteSchema = z.object({
    nome: z.string(),
    carteira: z.string().length(42),
  });
  
// Endpoint para adicionar um cliente
app.post('/clientes', async (req: FastifyRequest, res: FastifyReply) => {
    try {
        // Validar o corpo da requisição
        const clienteData = ClienteSchema.parse(req.body);

        const novoCliente = await prisma.cliente.create({
            data: clienteData,
        });

        return res.code(201).send(novoCliente);
    } catch (error: any) {
        if (error instanceof ZodError) {
            return res.code(400).send(error.errors);
        }
        console.log(error);
        return res.code(500).send({ error: error.message });
    }
});
  
// Endpoint para buscar todos os clientes
app.get('/clientes', async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const clientes = await prisma.cliente.findMany();
        return res.code(200).send(clientes);
    } catch (error: any) {
        console.log(error);
        return res.code(500).send({ error: error.message });
    }
});


// Iniciar servidor
app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
    console.log("🎧🚪 HTTP Server running ");
});
