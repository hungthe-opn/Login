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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.validateToken = exports.getUser = void 0;
var logging_1 = __importDefault(require("../config/logging"));
var mysql_1 = require("../config/mysql");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var NAMESPACE = 'User';
var sampleHealthCheck = function (req, res, next) {
    logging_1.default.info(NAMESPACE, "Samples health check route calles");
    return res.status(200).json({
        message: 'pong'
    });
};
function getUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var query;
        return __generator(this, function (_a) {
            logging_1.default.info(NAMESPACE, "Samples health check route calles");
            query = 'SELECT * FROM  users';
            (0, mysql_1.Connect)()
                .then(function (connection) {
                (0, mysql_1.Query)(connection, query)
                    .then(function (results) {
                    return res.status(200).json({
                        results: results
                    });
                })
                    .catch(function (error) {
                    logging_1.default.error(NAMESPACE, error.message, error);
                    return res.status(500).json({
                        message: error.message,
                        error: error
                    });
                })
                    .finally(function () { connection.end(); })
                    .catch(function (error) {
                    logging_1.default.error(NAMESPACE, error.message, error);
                    return res.status(500).json({
                        message: error.message,
                        error: error
                    });
                });
            });
            return [2 /*return*/];
        });
    });
}
exports.getUser = getUser;
function validateToken(req, res, next) {
    logging_1.default.info(NAMESPACE, 'Token validated');
    return res.status(200).json({
        message: 'Authorization'
    });
}
exports.validateToken = validateToken;
function register(req, res, next) {
    var _a = req.body(), id = _a.id, name = _a.name, password = _a.password, email = _a.email;
    bcryptjs_1.default.hash(password, 10, function (hashError, hash) {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }
        var query = "INSERT INTO users(id,name,password,email) VALUES (\"".concat(id, "\",\"").concat(name, "\",\"").concat(hash, "\",\"email\")");
        (0, mysql_1.Connect)()
            .then(function (connection) {
            (0, mysql_1.Query)(connection, query)
                .then(function (result) {
                return res.status(200).json(result);
            });
        })
            .catch(function (error) {
            logging_1.default.error(NAMESPACE, error.message, error);
            return res.status(500).json({
                message: error.message,
                error: error
            });
        });
    });
}
exports.register = register;
// export function login(req:Request,res:Response,next:Function){
//     let{name, password} = req.body;
//     let query = `SELECT * FROM users WHERE name = '${name}'`;
//     Connect()
//     .then(connection =>{
//         Query<IUser[]>(connection,query)
//             .then((users)=>{
//                 bcryptjs.compare(password,users[0].password,(error,result) =>{
//                     if (error){
//                         return res.status(401).json({message:error.message,error})
//                     }
//                     else if (result){
//                         signJWT(users[0],(_error,token) =>{
//                             if(_error){
//                                 return res.status(401).json({message:"unable to sign jwt",error:_error})
//                             }
//                         })
//                     }
//                 })
//
//
//             })
//             .catch((error)=>{
//                 logging.error(NAMESPACE,error.message,error);
//                 return res.status(500).json({
//                     message:error.message,error})
//             });
//     })
//     .catch(error=>{
//         logging.error(NAMESPACE,error.message,error);
//         return res.status(500).json({message:error.message,error})
//     })
// }
