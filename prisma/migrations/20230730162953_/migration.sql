/*
  Warnings:

  - You are about to drop the column `name` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "CardName" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "card_id" INTEGER NOT NULL,

    CONSTRAINT "CardName_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CardName" ADD CONSTRAINT "CardName_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
