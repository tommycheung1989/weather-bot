import axios from "axios";
import { Weather } from "../apiContracts/Weather";

export const getTemperature = async () => {
  const res = await axios.get(
    "https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_temperature_uc.csv"
  );
  const result = res.data;
};
export const getHumidity = async () => {
  const res = await axios.get(
    "https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_humidity_uc.csv"
  );
  const result = res.data;
};

export const getDataWithInterval = async (minute: number) => {
  const ms = minute * 60 * 1000;
  setInterval(async () => {
    getTime();
    await getTemperature();
  }, ms);
};
const getTime = () => {
  const time = new Date();
  console.log(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`);
};

const mapper = (content: string): Weather[] => {
  const data = content.replace(" ", "").split("\n");

  const temperatureReg = /氣溫/;
  const humidityReg = /相對濕度/;
  // const isTemperature = data[0];
  const isTemperature: boolean = data[0].match(temperatureReg)?.length > 0;
  const isHumidity: boolean = data[0].match(humidityReg)?.length > 0;
  console.log(isTemperature);
  console.log(isHumidity);
  data.splice(0, 1);

  const weather: Weather[] = data.map((item) => {
    const subgroup = item.split(",");
    console.log(item);
    return {
      location: subgroup[1],
    };
  });
  return weather;
};
