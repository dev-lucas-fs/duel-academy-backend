"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = require("../Configs/Prisma");
const NotFoundError_1 = __importDefault(require("../Errors/NotFoundError"));
function findAll(name) {
    return Prisma_1.prisma.card.findMany({
        where: {
            name: {
                contains: name,
                mode: "insensitive"
            }
        },
        take: 10
    });
}
async function findById(id) {
    const card = await Prisma_1.prisma.card.findFirst({
        where: {
            id
        },
        include: {
            CardOnBooster: true
        }
    });
    if (card === null)
        throw NotFoundError_1.default;
    const { CardOnBooster, id: cardId, description, type, img, name } = card;
    let boosters = [];
    for (let boosterId of CardOnBooster.map(({ booster_id }) => booster_id)) {
        const booster = await Prisma_1.prisma.booster.findFirst({ where: { id: boosterId } });
        boosters.push(booster);
    }
    return {
        cardId,
        description,
        type,
        img,
        name,
        boosters
    };
}
exports.default = {
    findAll,
    findById
};
