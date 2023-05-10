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
exports.getDataWithInterval = exports.getHumidity = exports.getTemperature = void 0;
const axios_1 = __importDefault(require("axios"));
const getTemperature = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get("https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_temperature_uc.csv");
    const result = res.data;
    console.log(result);
});
exports.getTemperature = getTemperature;
const getHumidity = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get("https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_humidity_uc.csv");
    const result = res.data;
    console.log(result);
    console.log(mapper(result));
});
exports.getHumidity = getHumidity;
const getDataWithInterval = (minute) => __awaiter(void 0, void 0, void 0, function* () {
    const ms = minute * 60 * 1000;
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        getTime();
        yield (0, exports.getTemperature)();
    }), ms);
});
exports.getDataWithInterval = getDataWithInterval;
const getTime = () => {
    const time = new Date();
    console.log(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`);
};
const mapper = (content) => {
    var _a, _b;
    const data = content.replace(" ", "").split("\n");
    const temperatureReg = /氣溫/;
    const humidityReg = /相對濕度/;
    // const isTemperature = data[0];
    const isTemperature = ((_a = data[0].match(temperatureReg)) === null || _a === void 0 ? void 0 : _a.length) > 0;
    const isHumidity = ((_b = data[0].match(humidityReg)) === null || _b === void 0 ? void 0 : _b.length) > 0;
    console.log(isTemperature);
    console.log(isHumidity);
    data.splice(0, 1);
    const weather = data.map((item) => {
        const subgroup = item.split(",");
        console.log(item);
        return {
            location: subgroup[1],
        };
    });
    return weather;
};
//# sourceMappingURL=fetch.js.map