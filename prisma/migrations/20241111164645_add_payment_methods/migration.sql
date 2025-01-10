-- CreateEnum
CREATE TYPE "PaymentMethodsType" AS ENUM ('local', 'online');

-- CreateTable
CREATE TABLE "PaymentMethods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PaymentMethodsType" NOT NULL,

    CONSTRAINT "PaymentMethods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantPaymentMethods" (
    "paymentMethodId" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,

    CONSTRAINT "MerchantPaymentMethods_pkey" PRIMARY KEY ("merchantId","paymentMethodId")
);

-- AddForeignKey
ALTER TABLE "MerchantPaymentMethods" ADD CONSTRAINT "MerchantPaymentMethods_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantPaymentMethods" ADD CONSTRAINT "MerchantPaymentMethods_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethods"("id") ON DELETE CASCADE ON UPDATE CASCADE;
