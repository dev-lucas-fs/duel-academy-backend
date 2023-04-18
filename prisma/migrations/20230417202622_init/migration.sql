-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardOnDeck" (
    "id" SERIAL NOT NULL,
    "deckId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "CardOnDeck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagForceGame" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TagForceGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT,
    "unlock" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "Booster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardOnBooster" (
    "booster_id" INTEGER NOT NULL,
    "card_id" INTEGER NOT NULL,

    CONSTRAINT "CardOnBooster_pkey" PRIMARY KEY ("booster_id","card_id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT,
    "description" TEXT,
    "type" TEXT,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardOnDeck" ADD CONSTRAINT "CardOnDeck_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardOnDeck" ADD CONSTRAINT "CardOnDeck_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booster" ADD CONSTRAINT "Booster_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "TagForceGame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardOnBooster" ADD CONSTRAINT "CardOnBooster_booster_id_fkey" FOREIGN KEY ("booster_id") REFERENCES "Booster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardOnBooster" ADD CONSTRAINT "CardOnBooster_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
