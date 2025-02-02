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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.login = exports.registerAdmin = void 0;
var admin_1 = __importDefault(require("../../models/admin"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var registerAdmin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullName, email, password, phoneNumber, salt, hashedPassword, newAdmin, savedAdmin, payload, token, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, fullName = _a.fullName, email = _a.email, password = _a.password, phoneNumber = _a.phoneNumber;
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 1:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
            case 2:
                hashedPassword = _b.sent();
                newAdmin = new admin_1.default({
                    fullName: fullName,
                    email: email,
                    password: hashedPassword,
                    phoneNumber: phoneNumber
                });
                return [4 /*yield*/, newAdmin.save()];
            case 3:
                savedAdmin = _b.sent();
                payload = {
                    admin: {
                        id: savedAdmin._id
                    }
                };
                token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });
                console.log({ token: token });
                // Send the token in response
                res.json({ token: token });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.error(err_1.message);
                res.status(500).send('Server Error');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.registerAdmin = registerAdmin;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, admin, isMatch, payload, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, admin_1.default.findOne({ email: email })];
            case 1:
                admin = _b.sent();
                // If admin not found, return error
                if (!admin) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid credentials' })];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(password, admin.password)];
            case 2:
                isMatch = _b.sent();
                // If password is not correct, return error
                if (!isMatch) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid credentials' })];
                }
                payload = {
                    admin: {
                        id: admin._id
                    }
                };
                token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });
                // Send token in response
                res.json({ token: token, adminId: admin._id, });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                console.error(err_2.message);
                res.status(500).send('Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
//# sourceMappingURL=admin.js.map