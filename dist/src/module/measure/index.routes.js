"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addMeasure_1 = require("./addMeasure");
const getMeasures_1 = require("./getMeasures");
const router = (0, express_1.Router)();
router.post('/', addMeasure_1.addMeasure);
router.get('/', getMeasures_1.getMeasures);
exports.default = router;
