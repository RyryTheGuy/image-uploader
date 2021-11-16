"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const config_1 = __importDefault(require("../utils/config"));
const app = (0, app_1.initializeApp)(config_1.default.FIREBASE_CONFIG);
const storage = (0, storage_1.getStorage)(app);
exports.default = storage;
