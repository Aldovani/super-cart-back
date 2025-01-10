/*
  Warnings:

  - Made the column `corporateName` on table `Merchant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tradeName` on table `Merchant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "MerchantType" ADD VALUE 'MINIMATKETS';

-- AlterTable
ALTER TABLE "Merchant" ALTER COLUMN "corporateName" SET NOT NULL,
ALTER COLUMN "tradeName" SET NOT NULL;
