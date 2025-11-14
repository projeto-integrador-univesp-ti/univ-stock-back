"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addLogin_1 = require("./addLogin");
const getLogins_1 = require("./getLogins");
const router = (0, express_1.Router)();
router.post('/', addLogin_1.addLogin);
router.get('/', getLogins_1.getLogins);
exports.default = router;
