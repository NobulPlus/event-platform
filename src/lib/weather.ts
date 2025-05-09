const locationCoordinates: Record<string, { latitude: number; longitude: number }> = {
  'Lagos, Nigeria': { latitude: 6.5244, longitude: 3.3792 },
  'San Francisco': { latitude: 37.7749, longitude: -122.4194 },
  'New York': { latitude: 40.7128, longitude: -74.0060 },
};

export async function getWeather(location: string) {
  console.log(`Fetching weather for location: ${location}`);
  const coords = locationCoordinates[location];
  if (!coords) {
    console.warn(`No coordinates found for location: ${location}`);
    return { error: `Weather data not available for ${location}` };
  }

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`
    );
    if (!response.ok) {
      throw new Error(`Weather API returned ${response.status}: ${await response.text()}`);
    }
    const data = await response.json();
    
    return {
      temperature: data.current_weather.temperature,
      condition: getWeatherCondition(data.current_weather.weathercode),
    };
  } catch (error) {
    console.error(`Error fetching weather for ${location}:`, error);
    return { error: `Failed to fetch weather for ${location}` };
  }
}

function getWeatherCondition(code: number): string {
  const conditions: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Light rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    80: 'Light showers',
    81: 'Moderate showers',
    82: 'Violent showers',
  };
  return conditions[code] || 'Unknown';
}