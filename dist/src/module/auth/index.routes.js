"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_1 = require("./create");
const exists_1 = require("./exists");
const router = (0, express_1.Router)();
router.post('/create', create_1.create);
router.post('/exists', exists_1.exists);
exports.default = router;
