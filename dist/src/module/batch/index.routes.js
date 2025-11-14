"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addBatch_1 = require("./addBatch");
const getBatches_1 = require("./getBatches");
const router = (0, express_1.Router)();
router.post('/', addBatch_1.addBatch);
router.get('/', getBatches_1.getBatches);
exports.default = router;
