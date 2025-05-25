const generateOrderedUniqueNumericHash = (): string => {
  const timestamp = Date.now().toString();
  const subMillis = Math.floor(performance.now() * 1000)
    .toString()
    .padStart(9, "0")
    .slice(0, 6);

  const randomPart = Array.from({ length: 26 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return `${timestamp}${subMillis}${randomPart}`;
};

export { generateOrderedUniqueNumericHash };
