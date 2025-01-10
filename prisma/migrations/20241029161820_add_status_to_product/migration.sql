-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('unavailable', 'available', 'preparation');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'preparation';
