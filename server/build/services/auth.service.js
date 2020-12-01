"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const users_model_1 = __importDefault(require("../models/users.model"));
const util_1 = require("../utils/util");
class AuthService {
    constructor() {
        this.users = users_model_1.default;
    }
    async signup(userData) {
        if (util_1.isEmptyObject(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = this.users.find(user => user.email === userData.email);
        if (findUser)
            throw new HttpException_1.default(409, `You're email ${userData.email} already exists`);
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const createUserData = Object.assign(Object.assign({ id: this.users.length + 1 }, userData), { password: hashedPassword });
        return createUserData;
    }
    async login(userData) {
        if (util_1.isEmptyObject(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = this.users.find(user => user.email === userData.email);
        if (!findUser)
            throw new HttpException_1.default(409, `You're email ${userData.email} not found`);
        const isPasswordMatching = await bcrypt.compare(userData.password, findUser.password);
        if (!isPasswordMatching)
            throw new HttpException_1.default(409, "You're password not matching");
        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);
        return { cookie, findUser };
    }
    async logout(userData) {
        if (util_1.isEmptyObject(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = this.users.find(user => user.password === userData.password);
        if (!findUser)
            throw new HttpException_1.default(409, "You're not user");
        return findUser;
    }
    createToken(user) {
        const dataStoredInToken = { id: user.id };
        const secret = process.env.JWT_SECRET;
        const expiresIn = 60 * 60;
        return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map