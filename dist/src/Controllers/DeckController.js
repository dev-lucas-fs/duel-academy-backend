"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("../Errors/Errors");
const DeckService_1 = __importDefault(require("../Services/DeckService"));
const http_status_1 = require("http-status");
async function getAllUserDecks(request, response) {
    try {
        const { userId } = request;
        const card = await DeckService_1.default.getDecksByUserId(userId);
        return response.send(card);
    }
    catch (error) {
        console.log(error);
        if (error.name === Errors_1.Errors.NotFound)
            return response.sendStatus(http_status_1.NOT_FOUND);
        return response.sendStatus(http_status_1.INTERNAL_SERVER_ERROR);
    }
}
async function postDeck(request, response) {
    try {
        const { userId } = request;
        const { cards, name } = request.body;
        console.log(userId, 'sss');
        const card = await DeckService_1.default.saveDeck({ userId, cards, name });
        return response.send(card);
    }
    catch (error) {
        console.log(error);
        if (error.name === Errors_1.Errors.NotFound)
            return response.sendStatus(http_status_1.NOT_FOUND);
        return response.sendStatus(http_status_1.INTERNAL_SERVER_ERROR);
    }
}
exports.default = {
    getAllUserDecks,
    postDeck
};
