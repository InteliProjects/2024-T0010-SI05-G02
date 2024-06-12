/*
  Warnings:

  - You are about to alter the column `quantidade` on the `Transacao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `preco` on the `Transacao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Transacao" ALTER COLUMN "quantidade" SET DATA TYPE INTEGER,
ALTER COLUMN "preco" SET DATA TYPE INTEGER;
