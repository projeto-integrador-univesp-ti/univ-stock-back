"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addMovement_1 = require("./addMovement");
const getMovements_1 = require("./getMovements");
const router = (0, express_1.Router)();
router.post('/', addMovement_1.addMovement);
router.get('/', getMovements_1.getMovements);
exports.default = router;
