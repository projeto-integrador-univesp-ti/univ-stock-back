import { format, toZonedTime } from "date-fns-tz";

const formateISODate = (dataIso: string): string => {
  const data = new Date(dataIso);

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  const segundos = String(data.getSeconds()).padStart(2, "0");

  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
};

const nowBrazil = () => {
  const timeZone = "America/Sao_Paulo";
  const now = new Date();
  const zoned = toZonedTime(now, timeZone);
  return format(zoned, "yyyy-MM-dd HH:mm:ss", { timeZone });
};

export { formateISODate, nowBrazil };
