"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addSupplier_1 = require("./addSupplier");
const getSuppliers_1 = require("./getSuppliers");
const router = (0, express_1.Router)();
router.post('/', addSupplier_1.addSupplier);
router.get('/', getSuppliers_1.getSuppliers);
exports.default = router;
