"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = __importDefault(require("../Errors/NotFoundError"));
const CardRepository_1 = __importDefault(require("../Repositories/CardRepository"));
const DeckRepository_1 = __importDefault(require("../Repositories/DeckRepository"));
async function saveDeck(deck) {
    const response = await DeckRepository_1.default.findUserDeckByName(deck.userId, deck.name);
    if (response !== null)
        throw NotFoundError_1.default;
    for (let card of deck.cards) {
        const response = await CardRepository_1.default.findById(Number(card));
        if (response === null)
            throw NotFoundError_1.default;
    }
    return await DeckRepository_1.default.createDeck(deck);
}
async function getDecksByUserId(id) {
    const decks = await DeckRepository_1.default.findByUserId(id);
    if (decks === null)
        throw NotFoundError_1.default;
    return decks;
}
exports.default = {
    saveDeck,
    getDecksByUserId
};
