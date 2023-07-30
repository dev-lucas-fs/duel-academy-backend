/*
  Warnings:

  - You are about to drop the `CardName` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CardName" DROP CONSTRAINT "CardName_card_id_fkey";

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "name" TEXT;

-- DropTable
DROP TABLE "CardName";
