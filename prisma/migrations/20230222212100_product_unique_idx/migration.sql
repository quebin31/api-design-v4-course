/*
  Warnings:

  - A unique constraint covering the columns `[id,belongs_to_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "products_id_belongs_to_id_key" ON "products"("id", "belongs_to_id");
