"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addContact_1 = require("./addContact");
const getContacts_1 = require("./getContacts");
const router = (0, express_1.Router)();
router.post('/', addContact_1.addContact);
router.get('/', getContacts_1.getContacts);
exports.default = router;
