"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formidable_1 = require("formidable");
const firebaseStorage_1 = require("../services/firebaseStorage");
const router = express_1.default.Router();
router.post('/', (request, response, next) => {
    const form = new formidable_1.Formidable();
    form.parse(request, (error, _fields, _files) => {
        if (error) {
            next(error);
        }
    });
    form.on('file', (_formname, file) => {
        (0, firebaseStorage_1.uploadFile)(file)
            .then(imageUrl => {
            return response.status(200).json(imageUrl);
        })
            .catch(error => next(error));
    });
});
exports.default = router;
