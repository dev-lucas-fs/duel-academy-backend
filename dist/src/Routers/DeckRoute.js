"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const DeckController_1 = __importDefault(require("../Controllers/DeckController"));
const AuthenticationMiddleware_1 = require("../Middlewares/AuthenticationMiddleware");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", AuthenticationMiddleware_1.authenticateToken, DeckController_1.default.getAllUserDecks);
router.post("/", AuthenticationMiddleware_1.authenticateToken, DeckController_1.default.postDeck);
exports.default = router;
