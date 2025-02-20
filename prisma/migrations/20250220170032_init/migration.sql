-- CreateTable
CREATE TABLE "products" (
    "group_id" TEXT NOT NULL,
    "product_code" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("group_id","product_code")
);
