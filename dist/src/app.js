"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.init = void 0;
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const CardsRoute_1 = __importDefault(require("./Routers/CardsRoute"));
const AuthenticationRoute_1 = __importDefault(require("./Routers/AuthenticationRoute"));
const DeckRoute_1 = __importDefault(require("./Routers/DeckRoute"));
const Environment_1 = require("./Configs/Environment");
const Prisma_1 = require("./Configs/Prisma");
const app = (0, express_1.default)();
app
    .use((0, express_1.json)())
    .use((0, cors_1.default)())
    .use("/card", CardsRoute_1.default)
    .use("/auth", AuthenticationRoute_1.default)
    .use("/decks", DeckRoute_1.default);
(0, Environment_1.loadEnvironment)();
function init() {
    (0, Prisma_1.connectDb)();
    return Promise.resolve(app);
}
exports.init = init;
async function close() {
    await (0, Prisma_1.disconnectDB)();
}
exports.close = close;
exports.default = app;
