"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = exports.signInSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signInSchema = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(6),
});
exports.signUpSchema = joi_1.default.object({
    username: joi_1.default.string().required().min(3),
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(6),
});
