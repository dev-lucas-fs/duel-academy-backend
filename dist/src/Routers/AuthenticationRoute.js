"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationMiddleware_1 = require("../Middlewares/ValidationMiddleware");
const AuthenticationController_1 = __importDefault(require("../Controllers/AuthenticationController"));
const express_1 = require("express");
const UserSchemas_1 = require("../Schemas/UserSchemas");
const router = (0, express_1.Router)();
router.post("/sign-in", (0, ValidationMiddleware_1.validateBody)(UserSchemas_1.signInSchema), AuthenticationController_1.default.signIn);
router.post("/sign-up", (0, ValidationMiddleware_1.validateBody)(UserSchemas_1.signUpSchema), AuthenticationController_1.default.signUp);
exports.default = router;
