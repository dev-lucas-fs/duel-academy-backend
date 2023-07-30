/*
  Warnings:

  - You are about to drop the column `type` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "type",
ADD COLUMN     "type_id" INTEGER;

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
