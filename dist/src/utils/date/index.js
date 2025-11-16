"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nowBrazil = exports.formateISODate = void 0;
const date_fns_tz_1 = require("date-fns-tz");
const formateISODate = (dataIso) => {
    const data = new Date(dataIso);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");
    const segundos = String(data.getSeconds()).padStart(2, "0");
    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
};
exports.formateISODate = formateISODate;
const nowBrazil = () => {
    const timeZone = "America/Sao_Paulo";
    const now = new Date();
    const zoned = (0, date_fns_tz_1.toZonedTime)(now, timeZone);
    return (0, date_fns_tz_1.format)(zoned, "yyyy-MM-dd HH:mm:ss", { timeZone });
};
exports.nowBrazil = nowBrazil;
