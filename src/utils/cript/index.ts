import bcrypt from 'bcrypt';
import crypto from 'crypto';

class CryptPassword {
    static encrypt = (senha: string): string => {
        const salt = bcrypt.genSaltSync(Number(process.env.JWT_SALT) || 10);
        return bcrypt.hashSync(senha + (process.env.PASSWORD ?? ''), salt);
    }

    static validate = (password: string, encodedPassword: string): boolean => {
        return bcrypt.compareSync(password + (process.env.PASSWORD ?? ''), encodedPassword);
    }

    static getTokenOpaque = () => {
        return crypto.randomBytes(24).toString('hex');
    }

    static randomString = (size: number = 8, chars: string = 'aA1#') => {
        let mask = '';
        if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
        if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chars.indexOf('1') > -1) mask += '0123456789';
        if (chars.indexOf('#') > -1) mask += '!@#$%&*+';
        mask.split('').sort(() => 0.5-Math.random()).join('');
        
        let result = '';
        for (let i = size; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
        return result;
    }
}

export { CryptPassword }