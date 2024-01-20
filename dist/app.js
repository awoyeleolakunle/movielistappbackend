"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const movieRoutes_1 = __importDefault(require("../src/routes/movieRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const hello = (req, res) => {
    return res.send("hello world");
};
app.use('/api/v1/movielistapp', hello);
app.use('api', movieRoutes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});
//mongoose.connect('mongodb://localhost:27017/moviedb', { useNewUrlParser: true, useUnifiedTopology: true });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//module.exports = app;
