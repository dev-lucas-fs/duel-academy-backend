"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CardController_1 = __importDefault(require("../Controllers/CardController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", CardController_1.default.getAll);
router.get("/:card_id", CardController_1.default.getById);
exports.default = router;
