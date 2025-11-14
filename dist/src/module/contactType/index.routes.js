"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addContactType_1 = require("./addContactType");
const getContactsTypes_1 = require("./getContactsTypes");
const router = (0, express_1.Router)();
router.post('/', addContactType_1.addContactType);
router.get('/', getContactsTypes_1.getContactsTypes);
exports.default = router;
