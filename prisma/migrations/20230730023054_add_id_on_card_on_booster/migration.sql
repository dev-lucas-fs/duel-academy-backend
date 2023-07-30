/*
  Warnings:

  - The primary key for the `CardOnBooster` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "CardOnBooster" DROP CONSTRAINT "CardOnBooster_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CardOnBooster_pkey" PRIMARY KEY ("id");
