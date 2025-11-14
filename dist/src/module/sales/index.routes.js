"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addSale_1 = require("./addSale");
const getSale_1 = require("./getSale");
const router = (0, express_1.Router)();
router.get('/:id', getSale_1.getSale);
router.post('/', addSale_1.addSale);
exports.default = router;
