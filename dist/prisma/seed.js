"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Environment_1 = require("../src/Configs/Environment");
const Prisma_1 = require("../src/Configs/Prisma");
const tag_force_1_data_1 = __importDefault(require("./../yu-gi-oh!-cards-webscrapping/tag-force-1.data"));
(0, Environment_1.loadEnvironment)();
(0, Prisma_1.connectDb)();
async function main() {
    await Prisma_1.prisma.cardOnDeck.deleteMany({});
    await Prisma_1.prisma.deck.deleteMany({});
    await Prisma_1.prisma.user.deleteMany({});
    await Prisma_1.prisma.cardOnBooster.deleteMany({});
    await Prisma_1.prisma.booster.deleteMany({});
    await Prisma_1.prisma.card.deleteMany({});
    await Prisma_1.prisma.tagForceGame.deleteMany({});
    const { id } = await Prisma_1.prisma.tagForceGame.create({ data: { name: "Tag Force 1" } });
    for (let booster of tag_force_1_data_1.default) {
        const { id: booster_id } = await Prisma_1.prisma.booster.create({
            data: {
                name: booster.name,
                unlock: booster.unlock,
                gameId: id
            }
        });
        if (booster.cards["Ultra Rare"] !== undefined) {
            for (let i = 0; i < booster.cards["Ultra Rare"].length; i++) {
                const { id } = await Prisma_1.prisma.card.create({
                    data: {
                        name: booster.cards["Ultra Rare"][i].name,
                        img: booster.cards["Ultra Rare"][i].image,
                        type: booster.cards["Ultra Rare"][i].type,
                        description: booster.cards["Ultra Rare"][i].description
                    }
                });
                await Prisma_1.prisma.cardOnBooster.create({
                    data: {
                        card_id: id,
                        booster_id
                    }
                });
            }
        }
        if (booster.cards["Super Rare"] !== undefined) {
            for (let i = 0; i < booster.cards["Super Rare"].length; i++) {
                const { id } = await Prisma_1.prisma.card.create({
                    data: {
                        name: booster.cards["Super Rare"][i].name,
                        img: booster.cards["Super Rare"][i].image,
                        type: booster.cards["Super Rare"][i].type,
                        description: booster.cards["Super Rare"][i].description
                    }
                });
                await Prisma_1.prisma.cardOnBooster.create({
                    data: {
                        card_id: id,
                        booster_id
                    }
                });
            }
        }
        if (booster.cards["Rare"] !== undefined) {
            for (let i = 0; i < booster.cards["Rare"].length; i++) {
                const { id } = await Prisma_1.prisma.card.create({
                    data: {
                        name: booster.cards["Rare"][i].name,
                        img: booster.cards["Rare"][i].image,
                        type: booster.cards["Rare"][i].type,
                        description: booster.cards["Rare"][i].description
                    }
                });
                await Prisma_1.prisma.cardOnBooster.create({
                    data: {
                        card_id: id,
                        booster_id
                    }
                });
            }
        }
        if (booster.cards["Common"] !== undefined) {
            for (let i = 0; i < booster.cards["Common"].length; i++) {
                const { id } = await Prisma_1.prisma.card.create({
                    data: {
                        name: booster.cards["Common"][i].name,
                        img: booster.cards["Common"][i].image,
                        type: booster.cards["Common"][i].type,
                        description: booster.cards["Common"][i].description
                    }
                });
                await Prisma_1.prisma.cardOnBooster.create({
                    data: {
                        card_id: id,
                        booster_id
                    }
                });
            }
        }
    }
}
main();
