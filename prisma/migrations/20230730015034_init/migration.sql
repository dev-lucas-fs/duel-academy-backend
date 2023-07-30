-- CreateTable
CREATE TABLE "Booster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT,
    "unlock" TEXT NOT NULL,

    CONSTRAINT "Booster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardOnBooster" (
    "booster_id" INTEGER NOT NULL,
    "card_id" INTEGER NOT NULL,
    "rarity" TEXT,

    CONSTRAINT "CardOnBooster_pkey" PRIMARY KEY ("booster_id","card_id")
);

-- CreateTable
CREATE TABLE "CardName" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "card_id" INTEGER NOT NULL,

    CONSTRAINT "CardName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "img" TEXT,
    "desc" TEXT,
    "atk" INTEGER,
    "def" INTEGER,
    "race" TEXT,
    "attribute" TEXT,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CardOnBooster" ADD CONSTRAINT "CardOnBooster_booster_id_fkey" FOREIGN KEY ("booster_id") REFERENCES "Booster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardOnBooster" ADD CONSTRAINT "CardOnBooster_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardName" ADD CONSTRAINT "CardName_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
