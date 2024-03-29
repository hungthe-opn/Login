"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var login_1 = __importDefault(require("./routes/login"));
// import extractJWT from './middleware/extractJWT'
var NAMESPACE = 'Server';
var router = (0, express_1.default)();
router.use(function (req, res, next) {
    logging_1.default.info(NAMESPACE, "METHOD - [".concat(req.method, "]. URL - [").concat(req.url, "],IP - [").concat(req.socket.remoteAddress, "]]"));
    res.on('finish', function () {
        logging_1.default.info(NAMESPACE, "METHOD - [".concat(req.method, "]. URL - [").concat(req.url, "],IP - [").concat(req.socket.remoteAddress, "]], STATUS - [").concat(res.statusCode, "]"));
    });
    next();
});
router.use(body_parser_1.default.urlencoded({ extended: false }));
router.use(body_parser_1.default.json());
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'Origin, x-Requested-With, Content-Type,Accept,Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});
router.use('/api');
router.use('/api', login_1.default);
router.use(function (req, res, next) {
    var error = new Error('not found!!');
    return res.status(404).json({
        message: error.message
    });
});
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () { return logging_1.default.info(NAMESPACE, "Server running on ".concat(config_1.default.server.hostname, ":").concat(config_1.default.server.port)); });
