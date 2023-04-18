"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = __importDefault(require("../Errors/NotFoundError"));
const CardRepository_1 = __importDefault(require("../Repositories/CardRepository"));
async function getById(id) {
    const card = await CardRepository_1.default.findById(id);
    if (card === null)
        throw NotFoundError_1.default;
    return card;
}
async function getAll(name) {
    const card = await CardRepository_1.default.findAll(name);
    if (card === null)
        throw NotFoundError_1.default;
    return card;
}
exports.default = {
    getById,
    getAll
};
