"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./utils/config"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const images_1 = __importDefault(require("./routes/images"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const mongoose_1 = __importDefault(require("mongoose"));
if (config_1.default.MONGODB_URI) {
    mongoose_1.default.connect(config_1.default.MONGODB_URI)
        .then(() => console.log('connected to MongoDB'))
        .catch(error => console.log('error connecting to MongoDB:', error.message));
}
else {
    console.error('MONGODB_URI is missing!');
}
const app = (0, express_1.default)();
// fixme: Remove Cors? Cors allowed origins
const options = {
    origin: ['http://localhost:3000']
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(options));
app.use(express_1.default.static('build'));
app.get('/ping', (_request, response) => {
    response.send('pong');
});
app.use('/images', images_1.default);
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
app.listen(config_1.default.PORT, () => {
    console.log(`Server running on port ${config_1.default.PORT}`);
});
