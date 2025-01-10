/*
  Warnings:

  - You are about to drop the column `creationDate` on the `StockEntry` table. All the data in the column will be lost.
  - You are about to drop the column `modificationDate` on the `StockEntry` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `StockEntry` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `StockEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockEntry" DROP COLUMN "creationDate",
DROP COLUMN "modificationDate",
DROP COLUMN "releaseDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
