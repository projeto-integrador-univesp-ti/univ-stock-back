"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
class CryptPassword {
}
exports.CryptPassword = CryptPassword;
CryptPassword.encrypt = (senha) => {
    var _a;
    const salt = bcrypt_1.default.genSaltSync(Number(process.env.JWT_SALT) || 10);
    return bcrypt_1.default.hashSync(senha + ((_a = process.env.PASSWORD) !== null && _a !== void 0 ? _a : ''), salt);
};
CryptPassword.validate = (password, encodedPassword) => {
    var _a;
    return bcrypt_1.default.compareSync(password + ((_a = process.env.PASSWORD) !== null && _a !== void 0 ? _a : ''), encodedPassword);
};
CryptPassword.getTokenOpaque = () => {
    return crypto_1.default.randomBytes(24).toString('hex');
};
CryptPassword.randomString = (size = 8, chars = 'aA1#') => {
    let mask = '';
    if (chars.indexOf('a') > -1)
        mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1)
        mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('1') > -1)
        mask += '0123456789';
    if (chars.indexOf('#') > -1)
        mask += '!@#$%&*+';
    mask.split('').sort(() => 0.5 - Math.random()).join('');
    let result = '';
    for (let i = size; i > 0; --i)
        result += mask[Math.floor(Math.random() * mask.length)];
    return result;
};
