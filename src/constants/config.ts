export default {
  // API URL's
  WEATHER_API_BASE_URL: (latitude: number, longitude: number, apiKey: string) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
};
