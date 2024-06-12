-- CreateTable
CREATE TABLE "Cliente" (
    "nome" TEXT NOT NULL,
    "carteira" VARCHAR(42) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_carteira_key" ON "Cliente"("carteira");
