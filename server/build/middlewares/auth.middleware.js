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
const jwt = __importStar(require("jsonwebtoken"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const users_model_1 = __importDefault(require("../models/users.model"));
const authMiddleware = (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (cookies && cookies.Authorization) {
            const secret = process.env.JWT_SECRET;
            const verificationResponse = jwt.verify(cookies.Authorization, secret);
            const userId = verificationResponse.id;
            const findUser = users_model_1.default.find(user => user.id === userId);
            if (findUser) {
                req.user = findUser;
                next();
            }
            else {
                next(new HttpException_1.default(401, 'Wrong authentication token'));
            }
        }
        else {
            next(new HttpException_1.default(404, 'Authentication token missing'));
        }
    }
    catch (error) {
        next(new HttpException_1.default(401, 'Wrong authentication token'));
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map