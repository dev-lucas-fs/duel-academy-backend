"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prisma_1 = require("../Configs/Prisma");
function signIn(email) {
    return Prisma_1.prisma.user.findFirst({
        where: { email }
    });
}
function signUp({ username, email, password }) {
    return Prisma_1.prisma.user.create({
        data: { username, email, password }
    });
}
exports.default = {
    signIn,
    signUp
};
