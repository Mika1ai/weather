const temperatureFormatting = (temperature, unitValue) => {
  let formatTemperature;
  switch(unitValue) {
    case '°C': {
      formatTemperature = temperature - 273.15;
      break;
    }
    case '°F': {
      formatTemperature = (temperature - 273.15) * 1.8 + 32
      break;
    }
    default: {
      formatTemperature = temperature;
    }
  }
  return Math.round(formatTemperature);
}

export default temperatureFormatting;