"use strict";
// movieRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movieController_1 = require("../controllers/movieController");
const router = (0, express_1.Router)();
router.post('/movieCreation', movieController_1.createMovie);
exports.default = router;
