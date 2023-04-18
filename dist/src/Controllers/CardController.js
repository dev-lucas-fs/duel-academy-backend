"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("../Errors/Errors");
const CardService_1 = __importDefault(require("../Services/CardService"));
const http_status_1 = require("http-status");
async function getById(request, response) {
    try {
        const { card_id } = request.params;
        const card = await CardService_1.default.getById(Number(card_id));
        return response.send(card);
    }
    catch (error) {
        if (error.name === Errors_1.Errors.NotFound)
            return response.sendStatus(http_status_1.NOT_FOUND);
        return response.sendStatus(http_status_1.INTERNAL_SERVER_ERROR);
    }
}
async function getAll(request, response) {
    try {
        const { name } = request.query;
        const card = await CardService_1.default.getAll(name);
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
    getAll,
    getById
};
