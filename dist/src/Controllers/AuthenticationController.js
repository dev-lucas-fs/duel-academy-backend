"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationService_1 = __importDefault(require("../Services/AuthenticationService"));
async function signIn(request, response) {
    try {
        const { email, password } = request.body;
        const token = await AuthenticationService_1.default.signIn({ email, password });
        return response.send({ token });
    }
    catch (err) {
        return response.sendStatus(404);
    }
}
async function signUp(request, response) {
    try {
        const { username, email, password } = request.body;
        await AuthenticationService_1.default.signUp({ username, email, password });
        return response.sendStatus(201);
    }
    catch (err) {
        console.log(err);
        return response.sendStatus(404);
    }
}
exports.default = {
    signIn,
    signUp
};
