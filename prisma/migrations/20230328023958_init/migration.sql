-- CreateTable
CREATE TABLE "Booster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unlock" TEXT NOT NULL,

    CONSTRAINT "Booster_pkey" PRIMARY KEY ("id")
);
