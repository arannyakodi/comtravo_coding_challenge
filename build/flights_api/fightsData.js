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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fightsData = void 0;
var config_1 = require("../config/config");
var axios_1 = __importDefault(require("axios"));
var fightsData = /** @class */ (function () {
    function fightsData() {
        this.formatedFlights = function (flights) {
            return flights.reduce(function (acc, current) {
                var t1 = current.slices[0].flight_number + "-" + current.slices[0].departure_date_time_utc;
                var t2 = current.slices[1].flight_number + "-" + current.slices[1].departure_date_time_utc;
                var id = [t1, t2].join('|');
                if (acc.temp.indexOf(id) === -1) {
                    acc.formatted.push(current);
                    acc.temp.push(id);
                }
                return acc;
            }, {
                temp: [],
                formatted: []
            }).formatted;
        };
    }
    fightsData.prototype.getFlights = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promises, response, flights, merged_flights, flights_to_return;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promises = [this.fetchSource1(), this.fetchSource2()];
                        response = [];
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        flights = _a.sent();
                        merged_flights = __spreadArray(__spreadArray([], flights[0] || []), flights[1] || []);
                        merged_flights.sort(function (a, b) {
                            return a.price - b.price;
                        });
                        flights_to_return = this.formatedFlights(merged_flights);
                        return [2 /*return*/, flights_to_return];
                }
            });
        });
    };
    fightsData.prototype.fetchSource1 = function () {
        return axios_1.default.get(config_1.API_URL + "/source1").then(function (res) { return res.data.flights; }).catch(function () {
            console.log('ERROR: Retriving data from source 1');
        });
    };
    ;
    fightsData.prototype.fetchSource2 = function () {
        return axios_1.default.get(config_1.API_URL + "/source2", { auth: {
                username: config_1.API_USERNAME,
                password: config_1.API_PASSWORD
            } }).then(function (res) { return res.data.flights; }).catch(function () {
            console.log('ERROR: Retriving data from source 2');
        });
    };
    ;
    return fightsData;
}());
exports.fightsData = fightsData;
