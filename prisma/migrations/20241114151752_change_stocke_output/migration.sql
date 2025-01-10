/*
  Warnings:

  - You are about to drop the column `creationDate` on the `StockOutput` table. All the data in the column will be lost.
  - You are about to drop the column `modificationDate` on the `StockOutput` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `StockOutput` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockOutput" DROP COLUMN "creationDate",
DROP COLUMN "modificationDate",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "releaseDate" SET DEFAULT CURRENT_TIMESTAMP;
