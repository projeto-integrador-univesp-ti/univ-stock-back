"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursiveObjectTo = exports.attributesCamelToSnakeCase = exports.attributesSnakeToCamelCase = exports.camelToSnakeCase = exports.snakeToCamelCase = void 0;
const snakeToCamelCase = (str) => {
    return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));
};
exports.snakeToCamelCase = snakeToCamelCase;
const camelToSnakeCase = (str) => {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};
exports.camelToSnakeCase = camelToSnakeCase;
const attributesSnakeToCamelCase = (obj) => {
    return Object.assign({}, ...Object.entries(obj).map(([key, value]) => {
        return { [snakeToCamelCase(key)]: value };
    }));
};
exports.attributesSnakeToCamelCase = attributesSnakeToCamelCase;
const attributesCamelToSnakeCase = (obj) => {
    return Object.assign({}, ...Object.entries(obj).map(([key, value]) => {
        return { [camelToSnakeCase(key)]: value };
    }));
};
exports.attributesCamelToSnakeCase = attributesCamelToSnakeCase;
const recursiveObjectTo = (obj, func) => {
    if (typeof obj != "object")
        return obj;
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
    return obj;
};
exports.recursiveObjectTo = recursiveObjectTo;
