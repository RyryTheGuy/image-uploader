"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const firebase_1 = __importDefault(require("../utils/firebase"));
const storage_1 = require("firebase/storage");
const fs_1 = __importDefault(require("fs"));
const crypto_1 = require("crypto");
const util_1 = require("@firebase/util");
const storage = firebase_1.default;
const uploadFile = (file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const imageRef = (0, storage_1.ref)(storage, (0, crypto_1.randomUUID)());
    const rawFile = fs_1.default.readFileSync(file.filepath);
    try {
        yield (0, storage_1.uploadBytes)(imageRef, rawFile, { contentType: (_a = file.mimetype) !== null && _a !== void 0 ? _a : undefined });
        return (0, storage_1.getDownloadURL)(imageRef)
            .then(url => url)
            .catch(error => new util_1.FirebaseError('500', `Unable to get the url for the image: ${error}`));
    }
    catch (error) {
        throw new util_1.FirebaseError('400', `Unable to upload image to storage: ${error}`);
    }
});
exports.uploadFile = uploadFile;
