const snakeToCamelCase = (str: string): string => {
  return str.replace(/([-_][a-z])/g, (group: string) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );
};

const camelToSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`);
};

const attributesSnakeToCamelCase = <T = Object>(obj: Object): T => {
  return Object.assign(
    {},
    ...Object.entries(obj).map(([key, value]) => {
      return { [snakeToCamelCase(key)]: value };
    })
  );
};

const attributesCamelToSnakeCase = <T = Object>(obj: Object): T => {
  return Object.assign(
    {},
    ...Object.entries(obj).map(([key, value]) => {
      return { [camelToSnakeCase(key)]: value };
    })
  );
};

const recursiveObjectTo = <T = Object>(obj: Record<string, any>, func: (str: string) => string): T => {
  if (typeof obj != "object") return obj;

  for (let oldName in obj) {
    const newName = func(oldName);

    if (newName != oldName) {
      if (obj.hasOwnProperty(oldName)) {
        obj[newName] = obj[oldName];
        delete obj[oldName];
      }
    }

    if (typeof obj[newName] == "object") {
      obj[newName] = recursiveObjectTo(obj[newName], func);
    }
  }
  return obj as T;
};

export {
  snakeToCamelCase,
  camelToSnakeCase,
  attributesSnakeToCamelCase,
  attributesCamelToSnakeCase,
  recursiveObjectTo,
};
