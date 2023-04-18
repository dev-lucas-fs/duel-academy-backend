"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = __importDefault(require("../Errors/NotFoundError"));
const AuthenticationRepository_1 = __importDefault(require("../Repositories/AuthenticationRepository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function createToken({ id, email }) {
    const token = jsonwebtoken_1.default.sign({
        id,
        email
    }, process.env.JWT_SECRET ?? "segredo");
    return token;
}
async function signIn({ email, password }) {
    const user = await AuthenticationRepository_1.default.signIn(email);
    console.log(user);
    if (user === null)
        throw NotFoundError_1.default;
    const isPassword = await bcrypt_1.default.compare(password, user.password);
    if (!isPassword)
        throw NotFoundError_1.default;
    const token = createToken({ email, id: user.id });
    return token;
}
async function signUp({ username, email, password }) {
    let user = await AuthenticationRepository_1.default.signIn(email);
    if (user?.username.toLowerCase() === username.toLowerCase())
        throw NotFoundError_1.default;
    if (user !== null)
        throw NotFoundError_1.default;
    const encrpyted = await bcrypt_1.default.hash(password, 10);
    const response = await AuthenticationRepository_1.default.signUp({ username, email, password: encrpyted });
    return response;
}
exports.default = {
    signIn,
    signUp
};
