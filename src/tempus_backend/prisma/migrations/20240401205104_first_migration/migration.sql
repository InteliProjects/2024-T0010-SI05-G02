-- CreateTable
CREATE TABLE "Produto" (
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("sku")
);

-- CreateTable
CREATE TABLE "Transacao" (
    "id" SERIAL NOT NULL,
    "carteira1" VARCHAR(42) NOT NULL,
    "carteira2" VARCHAR(42) NOT NULL,
    "quantidade" BIGINT NOT NULL,
    "preco" BIGINT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validado" BOOLEAN NOT NULL,
    "sku" TEXT NOT NULL,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Produto_sku_key" ON "Produto"("sku");

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_sku_fkey" FOREIGN KEY ("sku") REFERENCES "Produto"("sku") ON DELETE RESTRICT ON UPDATE CASCADE;
